import { AppBlock, events } from "@slflows/sdk/v1";

const catalogV2_UpdateTypeSchema: AppBlock = {
  name: "UpdateTypeSchema Catalog V2",
  description: `Update an existing catalog types schema, adding or removing attributes.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "ID of this catalog type",
            "type": "string",
            "required": true
      },
      "attributes": {
            "name": "Attributes",
            "description": "Request body field: attributes",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "array": {
                                    "type": "boolean"
                              },
                              "backlink_attribute": {
                                    "type": "string"
                              },
                              "id": {
                                    "type": "string"
                              },
                              "mode": {
                                    "type": "string",
                                    "enum": [
                                          "",
                                          "manual",
                                          "external",
                                          "internal",
                                          "dynamic",
                                          "backlink",
                                          "path"
                                    ]
                              },
                              "name": {
                                    "type": "string"
                              },
                              "path": {
                                    "type": "array",
                                    "items": {
                                          "type": "object",
                                          "additionalProperties": true
                                    }
                              },
                              "type": {
                                    "type": "string"
                              }
                        },
                        "required": [
                              "name",
                              "type",
                              "array"
                        ]
                  }
            },
            "required": false
      },
      "version": {
            "name": "Version",
            "description": "Request body field: version",
            "type": "number",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/catalog_types/{id}/actions/update_schema";
        url = url.replace("{id}", encodeURIComponent(String(input.event.inputConfig.id)));
        const body: Record<string, any> = {};
        if (input.event.inputConfig.attributes !== undefined) {
          body.attributes = input.event.inputConfig.attributes;
        }
        if (input.event.inputConfig.version !== undefined) {
          body.version = input.event.inputConfig.version;
        }
        const headers: Record<string, string> = {};

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`incident.io API error: ${response.status} ${response.statusText} - ${errorText}`);
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
      type: {
      "type": "object",
      "properties": {
            "catalog_type": {
                  "type": "object",
                  "properties": {
                        "annotations": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "categories": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "color": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "created_at": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "description": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "dynamic_resource_parameter": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "estimated_count": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "icon": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "is_editable": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "last_synced_at": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "name": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "ranked": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "registry_type": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "required_integrations": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "schema": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "semantic_type": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "source_repo_url": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "type_name": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "updated_at": {
                              "type": "object",
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "id",
                        "name",
                        "description",
                        "type_name",
                        "semantic_type",
                        "ranked",
                        "schema",
                        "icon",
                        "categories",
                        "color",
                        "is_editable",
                        "annotations",
                        "created_at",
                        "updated_at",
                        "engine_resource_type",
                        "mode",
                        "use_name_as_identifier"
                  ]
            }
      },
      "required": [
            "catalog_type"
      ]
},
    },
  },
};

export default catalogV2_UpdateTypeSchema;
