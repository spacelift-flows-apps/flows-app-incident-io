#!/usr/bin/env tsx

/**
 * Block Generator for incident.io API
 *
 * Generates Flows blocks from OpenAPI 3.0 specification
 */

import fs from "fs";
import path from "path";

interface OpenAPISpec {
  openapi: string;
  info: {
    title: string;
    version: string;
  };
  servers: Array<{ url: string }>;
  paths: Record<string, Record<string, Operation>>;
  "x-webhooks"?: Record<string, Record<string, Operation>>;
  components?: {
    schemas?: Record<string, Schema>;
  };
}

interface Operation {
  operationId?: string;
  summary?: string;
  description?: string;
  tags?: string[];
  parameters?: Parameter[];
  requestBody?: RequestBody;
  responses?: Record<string, Response>;
}

interface Parameter {
  name: string;
  in: "path" | "query" | "header";
  description?: string;
  required?: boolean;
  schema: Schema;
}

interface RequestBody {
  description?: string;
  required?: boolean;
  content: Record<string, { schema: Schema }>;
}

interface Response {
  description?: string;
  content?: Record<string, { schema: Schema }>;
}

interface Schema {
  type?: string;
  properties?: Record<string, Schema>;
  items?: Schema;
  required?: string[];
  enum?: string[];
  $ref?: string;
  description?: string;
  additionalProperties?: boolean | Schema;
  oneOf?: Schema[];
  anyOf?: Schema[];
  allOf?: Schema[];
}

class BlockGenerator {
  private spec: OpenAPISpec;
  private baseUrl: string;

  // Static list of deprecated paths (as of spec generation)
  // We maintain this list to avoid breaking existing users when new endpoints are added
  private static DEPRECATED_PATHS = new Set([
    "/v1/actions:get",
    "/v1/actions/{id}:get",
    "/v1/custom_fields:get",
    "/v1/custom_fields:post",
    "/v1/custom_fields/{id}:delete",
    "/v1/custom_fields/{id}:get",
    "/v1/custom_fields/{id}:put",
    "/v1/incident_roles:get",
    "/v1/incident_roles:post",
    "/v1/incident_roles/{id}:delete",
    "/v1/incident_roles/{id}:get",
    "/v1/incident_roles/{id}:put",
    "/v1/incidents:get",
    "/v1/incidents:post",
    "/v1/incidents/{id}:get",
    "/v1/openapi.json:get",
    "/v2/catalog_entries:get",
    "/v2/catalog_entries:post",
    "/v2/catalog_entries/{id}:delete",
    "/v2/catalog_entries/{id}:get",
    "/v2/catalog_entries/{id}:put",
    "/v2/catalog_resources:get",
    "/v2/catalog_types:get",
    "/v2/catalog_types:post",
    "/v2/catalog_types/{id}:delete",
    "/v2/catalog_types/{id}:get",
    "/v2/catalog_types/{id}:put",
    "/v2/catalog_types/{id}/actions/update_schema:post",
  ]);

  constructor(specPath: string) {
    const content = fs.readFileSync(specPath, "utf8");
    this.spec = JSON.parse(content);
    this.baseUrl = this.spec.servers[0]?.url || "https://api.incident.io";

    // Debug: check if we have webhook paths
    const pathKeys = Object.keys(this.spec.paths);
    const samplePaths = pathKeys.slice(0, 5);
    const lastPaths = pathKeys.slice(-5);
    console.log("Sample first paths:", samplePaths);
    console.log("Sample last paths:", lastPaths);
  }

  private isDeprecated(path: string, method: string): boolean {
    return BlockGenerator.DEPRECATED_PATHS.has(`${path}:${method}`);
  }

  generate(outputDir: string) {
    console.log("Generating blocks from OpenAPI spec...");

    // Clean output directories
    if (fs.existsSync(outputDir)) {
      fs.rmSync(outputDir, { recursive: true });
    }
    fs.mkdirSync(outputDir, { recursive: true });

    const webhooksDir = path.join(outputDir, "../webhooks");
    if (fs.existsSync(webhooksDir)) {
      fs.rmSync(webhooksDir, { recursive: true });
    }

    const apiBlocks: Array<{ name: string; importPath: string }> = [];
    const webhookBlocks: Array<{ name: string; importPath: string }> = [];

    // Count webhook paths for debugging
    const allPaths = Object.keys(this.spec.paths);
    console.log(`Total paths in spec: ${allPaths.length}`);
    const webhookPaths = allPaths.filter((p) => p.startsWith("/x-webhooks/"));
    console.log(`Found ${webhookPaths.length} webhook paths in spec`);
    if (webhookPaths.length > 0) {
      console.log(`First webhook path: ${webhookPaths[0]}`);
    }

    // Generate webhook subscription blocks from x-webhooks section
    if (this.spec["x-webhooks"]) {
      console.log("Processing webhook subscriptions...");
      for (const [pathStr, pathItem] of Object.entries(
        this.spec["x-webhooks"],
      )) {
        // Only process paths starting with /x-webhooks/, not /x-audit-logs/
        if (!pathStr.startsWith("/x-webhooks/")) {
          continue;
        }

        for (const [method, operation] of Object.entries(pathItem)) {
          if (method !== "get") continue;

          try {
            const eventType = pathStr.replace("/x-webhooks/", "");
            const blockName = this.generateWebhookBlockName(eventType);
            const webhooksDir = path.join(outputDir, "../webhooks");
            fs.mkdirSync(webhooksDir, { recursive: true });
            const blockPath = path.join(webhooksDir, `${blockName}.ts`);

            this.generateWebhookSubscriptionBlock(
              blockPath,
              eventType,
              operation,
            );

            webhookBlocks.push({
              name: blockName,
              importPath: `../webhooks/${blockName}`,
            });

            console.log(`✓ Generated webhook subscription ${blockName}`);
          } catch (error: any) {
            console.warn(
              `⚠ Failed to generate webhook block for ${pathStr}:`,
              error.message,
            );
          }
        }
      }
    }

    // Generate API blocks from paths
    let skippedDeprecated = 0;
    for (const [pathStr, pathItem] of Object.entries(this.spec.paths)) {
      // Generate API blocks
      for (const [method, operation] of Object.entries(pathItem)) {
        if (!["get", "post", "put", "delete", "patch"].includes(method)) {
          continue;
        }

        // Skip deprecated endpoints
        if (this.isDeprecated(pathStr, method)) {
          skippedDeprecated++;
          continue;
        }

        try {
          const blockName = this.generateBlockName(operation, method, pathStr);
          const blockPath = path.join(outputDir, `${blockName}.ts`);

          this.generateBlock(blockPath, pathStr, method, operation);

          apiBlocks.push({
            name: blockName,
            importPath: `./${blockName}`,
          });

          console.log(`✓ Generated ${blockName}`);
        } catch (error: any) {
          console.warn(
            `⚠ Failed to generate block for ${method.toUpperCase()} ${pathStr}:`,
            error.message,
          );
        }
      }
    }

    if (skippedDeprecated > 0) {
      console.log(`\n⏭  Skipped ${skippedDeprecated} deprecated endpoints`);
    }

    // Generate index.ts for API blocks
    this.generateIndex(outputDir, apiBlocks);

    // Generate index.ts for webhook blocks
    if (webhookBlocks.length > 0) {
      const webhooksDir = path.join(outputDir, "../webhooks");
      this.generateWebhookIndex(webhooksDir, webhookBlocks);
    }

    console.log(
      `\n✅ Generated ${apiBlocks.length} API blocks and ${webhookBlocks.length} webhook subscription blocks`,
    );
  }

  private generateBlockName(
    operation: Operation,
    method: string,
    path: string,
  ): string {
    if (operation.operationId) {
      // Convert "Incidents V2#ListIncidents" to "incidentsV2_ListIncidents"
      // This ensures uniqueness across different API versions
      const fullId = operation.operationId
        .replace(/ /g, "") // Remove spaces
        .replace(/#/, "_") // Replace # with _
        .replace(/-/g, ""); // Remove hyphens

      return fullId.charAt(0).toLowerCase() + fullId.slice(1);
    }

    // Fallback: use method and path
    const pathParts = path.split("/").filter((p) => p && !p.startsWith("{"));
    const name = pathParts.join("_") + "_" + method;
    return name.replace(/[^a-zA-Z0-9]/g, "_");
  }

  private humanizeName(operation: Operation, method: string): string {
    if (operation.summary) {
      return operation.summary;
    }

    if (operation.operationId) {
      const parts = operation.operationId.split("#");
      const opName = parts[parts.length - 1];
      // Convert camelCase to Title Case
      return opName
        .replace(/([A-Z])/g, " $1")
        .trim()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return `${method.toUpperCase()} ${path}`;
  }

  private generateBlock(
    filePath: string,
    pathStr: string,
    method: string,
    operation: Operation,
  ) {
    const blockName = path.basename(filePath, ".ts");
    const humanName = this.humanizeName(operation, method);
    const description =
      operation.description?.split("\n")[0].trim() || humanName;

    // Use the first tag as the category, fallback to "API"
    const category = operation.tags?.[0] || "API";

    // Generate input config
    const inputConfig = this.generateInputConfig(pathStr, method, operation);

    // Generate output type
    const outputType = this.generateOutputType(operation);

    // Generate request building code
    const requestCode = this.generateRequestCode(pathStr, method, operation);

    const content = `import { AppBlock, events } from "@slflows/sdk/v1";

const ${blockName}: AppBlock = {
  name: "${humanName}",
  description: \`${this.escapeDescription(description)}\`,
  category: "${category}",

  inputs: {
    default: {
      config: ${JSON.stringify(inputConfig, null, 6)},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        ${requestCode}

        const response = await fetch(url, {
          method: "${method.toUpperCase()}",
          headers: {
            "Authorization": \`Bearer \${apiKey}\`,
            "Content-Type": "application/json",
            ...headers,
          },
          ${method !== "get" ? "body: body ? JSON.stringify(body) : undefined," : ""}
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(\`incident.io API error: \${response.status} \${response.statusText} - \${errorText}\`);
        }

        const result = response.status === 204 ? {} : await response.json();
        await events.emit(result);
      },
    },
  },

  outputs: {
    default: {
      name: "Result",
      description: "API response",
      default: true,
      possiblePrimaryParents: ["default"],
      type: ${JSON.stringify(outputType, null, 6)},
    },
  },
};

export default ${blockName};
`;

    fs.writeFileSync(filePath, content);
  }

  private generateInputConfig(
    pathStr: string,
    method: string,
    operation: Operation,
  ): Record<string, any> {
    const config: Record<string, any> = {};

    // Add path parameters
    const pathParams = pathStr.match(/\{([^}]+)\}/g) || [];
    for (const param of pathParams) {
      const paramName = param.slice(1, -1);
      const paramDef = operation.parameters?.find(
        (p) => p.name === paramName && p.in === "path",
      );

      config[paramName] = {
        name: this.humanizeParamName(paramName),
        description: paramDef?.description || `Path parameter: ${paramName}`,
        type: this.schemaToFlowsType(paramDef?.schema || { type: "string" }),
        required: true,
      };
    }

    // Add query parameters
    const queryParams =
      operation.parameters?.filter((p) => p.in === "query") || [];
    for (const param of queryParams) {
      config[param.name] = {
        name: this.humanizeParamName(param.name),
        description: param.description || `Query parameter: ${param.name}`,
        type: this.schemaToFlowsType(param.schema),
        required: param.required || false,
      };
    }

    // Add request body properties
    if (operation.requestBody && method !== "get") {
      const schema =
        operation.requestBody.content?.["application/json"]?.schema;
      if (schema) {
        const bodyProps = this.extractSchemaProperties(schema);
        for (const [propName, propSchema] of Object.entries(bodyProps)) {
          config[propName] = {
            name: this.humanizeParamName(propName),
            description:
              propSchema.description || `Request body field: ${propName}`,
            type: this.schemaToFlowsType(propSchema),
            required: schema.required?.includes(propName) || false,
          };
        }
      }
    }

    return config;
  }

  private extractSchemaProperties(schema: Schema): Record<string, Schema> {
    if (schema.$ref) {
      const resolved = this.resolveRef(schema.$ref);
      if (resolved) {
        return this.extractSchemaProperties(resolved);
      }
    }

    if (schema.properties) {
      return schema.properties;
    }

    if (schema.allOf) {
      const merged: Record<string, Schema> = {};
      for (const subSchema of schema.allOf) {
        Object.assign(merged, this.extractSchemaProperties(subSchema));
      }
      return merged;
    }

    return {};
  }

  private generateRequestCode(
    pathStr: string,
    method: string,
    operation: Operation,
  ): string {
    const lines: string[] = [];

    // Build URL with path parameters
    lines.push(`let url = "${this.baseUrl}${pathStr}";`);
    const pathParams = pathStr.match(/\{([^}]+)\}/g) || [];
    for (const param of pathParams) {
      const paramName = param.slice(1, -1);
      lines.push(
        `url = url.replace("${param}", encodeURIComponent(String(input.event.inputConfig.${paramName})));`,
      );
    }

    // Add query parameters
    const queryParams =
      operation.parameters?.filter((p) => p.in === "query") || [];
    if (queryParams.length > 0) {
      lines.push(`const queryParams = new URLSearchParams();`);
      for (const param of queryParams) {
        lines.push(
          `if (input.event.inputConfig.${param.name} !== undefined) {`,
        );
        lines.push(
          `  queryParams.append("${param.name}", String(input.event.inputConfig.${param.name}));`,
        );
        lines.push(`}`);
      }
      lines.push(
        `if (queryParams.toString()) url += "?" + queryParams.toString();`,
      );
    }

    // Build request body (only for non-GET requests)
    if (method !== "get") {
      if (operation.requestBody) {
        const schema =
          operation.requestBody.content?.["application/json"]?.schema;
        if (schema) {
          const bodyProps = this.extractSchemaProperties(schema);
          const propNames = Object.keys(bodyProps);

          if (propNames.length > 0) {
            lines.push(`const body: Record<string, any> = {};`);
            for (const propName of propNames) {
              lines.push(
                `if (input.event.inputConfig.${propName} !== undefined) {`,
              );
              lines.push(
                `  body.${propName} = input.event.inputConfig.${propName};`,
              );
              lines.push(`}`);
            }
          } else {
            lines.push(`const body = undefined;`);
          }
        } else {
          lines.push(`const body = undefined;`);
        }
      } else {
        lines.push(`const body = undefined;`);
      }
    }

    lines.push(`const headers: Record<string, string> = {};`);

    return lines.join("\n        ");
  }

  private generateOutputType(operation: Operation): any {
    const successResponse =
      operation.responses?.["200"] ||
      operation.responses?.["201"] ||
      operation.responses?.["204"];

    if (!successResponse) {
      return { type: "object", additionalProperties: true };
    }

    const schema = successResponse.content?.["application/json"]?.schema;
    if (!schema) {
      return { type: "object", additionalProperties: true };
    }

    return this.schemaToOutputType(schema);
  }

  private schemaToFlowsType(schema: Schema): any {
    if (schema.$ref) {
      const resolved = this.resolveRef(schema.$ref);
      if (resolved) {
        return this.schemaToFlowsType(resolved);
      }
    }

    switch (schema.type) {
      case "string":
        return "string";
      case "number":
      case "integer":
        return "number";
      case "boolean":
        return "boolean";
      case "array":
      case "object":
        return this.schemaToOutputType(schema);
      default:
        return "string";
    }
  }

  private schemaToOutputType(schema: Schema, depth = 0): any {
    if (depth > 20) {
      return { type: "object", additionalProperties: true };
    }

    if (schema.$ref) {
      const resolved = this.resolveRef(schema.$ref);
      if (resolved) {
        return this.schemaToOutputType(resolved, depth + 1);
      }
      // If ref couldn't be resolved, return generic object
      return { type: "object", additionalProperties: true };
    }

    if (schema.oneOf || schema.anyOf) {
      return { type: "object", additionalProperties: true };
    }

    if (schema.allOf) {
      const merged: any = { type: "object", properties: {} };
      for (const subSchema of schema.allOf) {
        const resolved = this.schemaToOutputType(subSchema, depth + 1);
        if (resolved.properties) {
          Object.assign(merged.properties, resolved.properties);
        }
      }
      return merged;
    }

    // Handle schemas with properties but no explicit type (treat as object)
    if (schema.properties && !schema.type) {
      const properties: Record<string, any> = {};
      for (const [propName, propSchema] of Object.entries(schema.properties)) {
        properties[propName] = this.schemaToOutputType(propSchema, depth + 1);
      }
      return {
        type: "object",
        properties,
        ...(schema.required && schema.required.length > 0
          ? { required: schema.required }
          : { additionalProperties: true }),
      };
    }

    switch (schema.type) {
      case "object":
        if (schema.properties) {
          const properties: Record<string, any> = {};
          for (const [propName, propSchema] of Object.entries(
            schema.properties,
          )) {
            properties[propName] = this.schemaToOutputType(
              propSchema,
              depth + 1,
            );
          }
          return {
            type: "object",
            properties,
            ...(schema.required && schema.required.length > 0
              ? { required: schema.required }
              : { additionalProperties: true }),
          };
        }
        return { type: "object", additionalProperties: true };

      case "array":
        if (schema.items) {
          return {
            type: "array",
            items: this.schemaToOutputType(schema.items, depth + 1),
          };
        }
        return { type: "array", items: { type: "any" } };

      case "string":
        if (schema.enum) {
          return { type: "string", enum: schema.enum };
        }
        return { type: "string" };

      case "number":
      case "integer":
        return { type: "number" };

      case "boolean":
        return { type: "boolean" };

      default:
        // If no type specified but has example, infer from example
        if (schema.enum) {
          return { type: "string", enum: schema.enum };
        }
        // Default to string for unknown types
        return { type: "string" };
    }
  }

  private resolveRef(ref: string): Schema | null {
    if (!ref.startsWith("#/components/schemas/")) {
      return null;
    }

    const schemaName = ref.replace("#/components/schemas/", "");
    return this.spec.components?.schemas?.[schemaName] || null;
  }

  private humanizeParamName(name: string): string {
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  private escapeDescription(desc: string): string {
    return desc
      .replace(/`/g, "'")
      .replace(/\$/g, "\\$")
      .replace(/\n/g, " ")
      .trim()
      .substring(0, 200);
  }

  private generateIndex(
    outputDir: string,
    blocks: Array<{ name: string; importPath: string }>,
  ) {
    // Generate imports (use block name as import alias)
    const imports = blocks
      .map((b) => `import ${b.name} from "${b.importPath}";`)
      .join("\n");

    // Generate exports using ES6 shorthand (blockName: blockName becomes just blockName)
    const usedKeys = new Set<string>();
    const exports = blocks
      .map((b) => {
        const key = b.name;

        // Check for collisions (should never happen since block names are unique)
        if (usedKeys.has(key)) {
          throw new Error(
            `Duplicate export key detected: ${key}. Block names must be unique.`,
          );
        }
        usedKeys.add(key);

        return `  ${key},`;
      })
      .join("\n");

    const content = `${imports}

export const generatedBlocks = {
${exports}
};
`;

    fs.writeFileSync(path.join(outputDir, "index.ts"), content);
    console.log(`✓ Generated index.ts`);
  }

  private generateWebhookIndex(
    outputDir: string,
    blocks: Array<{ name: string; importPath: string }>,
  ) {
    // Generate imports (block names are unique for webhooks)
    const imports = blocks
      .map((b) => `import ${b.name} from "./${b.name}";`)
      .join("\n");

    // Generate exports using ES6 shorthand
    const usedKeys = new Set<string>();
    const exports = blocks
      .map((b) => {
        const key = b.name;

        // Check for collisions (should never happen with webhook subscriptions)
        if (usedKeys.has(key)) {
          throw new Error(
            `Duplicate export key detected: ${key}. Webhook subscription names should be unique.`,
          );
        }
        usedKeys.add(key);

        return `  ${key},`;
      })
      .join("\n");

    const content = `${imports}

export const webhookSubscriptions = {
${exports}
};
`;

    fs.writeFileSync(path.join(outputDir, "index.ts"), content);
    console.log(`✓ Generated webhooks/index.ts`);
  }

  private generateWebhookBlockName(eventType: string): string {
    // Convert "public_incident.incident_created_v2" to "publicIncidentIncidentCreatedV2Subscription"
    const name = eventType
      .replace(/[._]/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
    return name.charAt(0).toLowerCase() + name.slice(1) + "Subscription";
  }

  private generateWebhookSubscriptionBlock(
    filePath: string,
    eventType: string,
    operation: Operation,
  ) {
    const blockName = path.basename(filePath, ".ts");
    const humanName = this.humanizeWebhookName(eventType);
    const description =
      operation.description || `Subscription for ${eventType} webhook events`;

    // Get the schema for the webhook payload
    const outputType = this.generateOutputType(operation);

    const content = `import { AppBlock, events } from "@slflows/sdk/v1";

const ${blockName}: AppBlock = {
  name: "${humanName}",
  description: \`${this.escapeDescription(description)}\`,
  category: "Webhook Receivers",

  async onInternalMessage(input) {
    const event = input.message.body;

    // Check if this is the right event type for this subscription
    if (event && event.event_type === "${eventType}") {
      console.log("Received ${eventType} webhook event");
      await events.emit(event);
    } else {
      console.warn(
        "${blockName} received unexpected event type:",
        event?.event_type
      );
    }
  },

  outputs: {
    default: {
      name: "Event",
      description: "Emitted when a ${eventType} webhook is received",
      default: true,
      type: ${JSON.stringify(outputType, null, 6)},
    },
  },
};

export default ${blockName};
`;

    fs.writeFileSync(filePath, content);
  }

  private humanizeWebhookName(eventType: string): string {
    // Convert "public_incident.incident_created_v2" to "Public Incident - Incident Created V2"
    const parts = eventType.split(".");
    const humanized = parts
      .map((part) => {
        return part
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      })
      .join(" - ");
    return humanized;
  }
}

// Main execution
const swaggerPath = path.resolve("./openapi/swagger.json");
const outputDir = path.resolve("./blocks/generated");

const generator = new BlockGenerator(swaggerPath);
generator.generate(outputDir);
