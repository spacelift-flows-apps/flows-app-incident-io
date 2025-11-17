import { AppBlock, events } from "@slflows/sdk/v1";

const catalogV2_UpdateType: AppBlock = {
  name: "UpdateType Catalog V2",
  description: `Updates an existing catalog type. The schema must be updated using the UpdateTypeSchema endpoint.`,
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
      "annotations": {
            "name": "Annotations",
            "description": "Annotations that can track metadata about this type",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "categories": {
            "name": "Categories",
            "description": "What categories is this type considered part of",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "string",
                        "enum": [
                              "customer",
                              "issue-tracker",
                              "product-feature",
                              "service",
                              "on-call",
                              "team",
                              "user"
                        ]
                  }
            },
            "required": false
      },
      "color": {
            "name": "Color",
            "description": "Sets the display color of this type in the dashboard",
            "type": "string",
            "required": false
      },
      "description": {
            "name": "Description",
            "description": "Human readble description of this type",
            "type": "string",
            "required": false
      },
      "icon": {
            "name": "Icon",
            "description": "Sets the display icon of this type in the dashboard",
            "type": "string",
            "required": false
      },
      "name": {
            "name": "Name",
            "description": "Name is the human readable name of this type",
            "type": "string",
            "required": false
      },
      "ranked": {
            "name": "Ranked",
            "description": "If this type should be ranked",
            "type": "boolean",
            "required": false
      },
      "source_repo_url": {
            "name": "Source Repo Url",
            "description": "The url of the external repository where this type is managed",
            "type": "string",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/catalog_types/{id}";
        url = url.replace("{id}", encodeURIComponent(String(input.event.inputConfig.id)));
        const body: Record<string, any> = {};
        if (input.event.inputConfig.annotations !== undefined) {
          body.annotations = input.event.inputConfig.annotations;
        }
        if (input.event.inputConfig.categories !== undefined) {
          body.categories = input.event.inputConfig.categories;
        }
        if (input.event.inputConfig.color !== undefined) {
          body.color = input.event.inputConfig.color;
        }
        if (input.event.inputConfig.description !== undefined) {
          body.description = input.event.inputConfig.description;
        }
        if (input.event.inputConfig.icon !== undefined) {
          body.icon = input.event.inputConfig.icon;
        }
        if (input.event.inputConfig.name !== undefined) {
          body.name = input.event.inputConfig.name;
        }
        if (input.event.inputConfig.ranked !== undefined) {
          body.ranked = input.event.inputConfig.ranked;
        }
        if (input.event.inputConfig.source_repo_url !== undefined) {
          body.source_repo_url = input.event.inputConfig.source_repo_url;
        }
        const headers: Record<string, string> = {};

        const response = await fetch(url, {
          method: "PUT",
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

export default catalogV2_UpdateType;
