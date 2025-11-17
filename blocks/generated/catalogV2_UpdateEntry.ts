import { AppBlock, events } from "@slflows/sdk/v1";

const catalogV2_UpdateEntry: AppBlock = {
  name: "UpdateEntry Catalog V2",
  description: `Updates an existing catalog entry.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "ID of this catalog entry",
            "type": "string",
            "required": true
      },
      "aliases": {
            "name": "Aliases",
            "description": "Optional aliases that can be used to reference this entry",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "string"
                  }
            },
            "required": false
      },
      "attribute_values": {
            "name": "Attribute Values",
            "description": "Values of this entry",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "external_id": {
            "name": "External Id",
            "description": "An optional alternative ID for this entry, which is ensured to be unique for the type",
            "type": "string",
            "required": false
      },
      "name": {
            "name": "Name",
            "description": "Name is the human readable name of this entry",
            "type": "string",
            "required": false
      },
      "rank": {
            "name": "Rank",
            "description": "When catalog type is ranked, this is used to help order things",
            "type": "number",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/catalog_entries/{id}";
        url = url.replace("{id}", encodeURIComponent(String(input.event.inputConfig.id)));
        const body: Record<string, any> = {};
        if (input.event.inputConfig.aliases !== undefined) {
          body.aliases = input.event.inputConfig.aliases;
        }
        if (input.event.inputConfig.attribute_values !== undefined) {
          body.attribute_values = input.event.inputConfig.attribute_values;
        }
        if (input.event.inputConfig.external_id !== undefined) {
          body.external_id = input.event.inputConfig.external_id;
        }
        if (input.event.inputConfig.name !== undefined) {
          body.name = input.event.inputConfig.name;
        }
        if (input.event.inputConfig.rank !== undefined) {
          body.rank = input.event.inputConfig.rank;
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
            "catalog_entry": {
                  "type": "object",
                  "properties": {
                        "aliases": {
                              "type": "array",
                              "items": {
                                    "type": "string"
                              }
                        },
                        "archived_at": {
                              "type": "string"
                        },
                        "attribute_values": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "catalog_type_id": {
                              "type": "string"
                        },
                        "created_at": {
                              "type": "string"
                        },
                        "external_id": {
                              "type": "string"
                        },
                        "id": {
                              "type": "string"
                        },
                        "name": {
                              "type": "string"
                        },
                        "rank": {
                              "type": "number"
                        },
                        "updated_at": {
                              "type": "string"
                        }
                  },
                  "required": [
                        "id",
                        "catalog_type_id",
                        "name",
                        "aliases",
                        "rank",
                        "attribute_values",
                        "created_at",
                        "updated_at"
                  ]
            },
            "catalog_type": {
                  "type": "object",
                  "properties": {
                        "annotations": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "categories": {
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
                        "color": {
                              "type": "string",
                              "enum": [
                                    "yellow",
                                    "green",
                                    "blue",
                                    "violet",
                                    "pink",
                                    "cyan",
                                    "orange"
                              ]
                        },
                        "created_at": {
                              "type": "string"
                        },
                        "description": {
                              "type": "string"
                        },
                        "dynamic_resource_parameter": {
                              "type": "string"
                        },
                        "estimated_count": {
                              "type": "number"
                        },
                        "icon": {
                              "type": "string",
                              "enum": [
                                    "alert",
                                    "bolt",
                                    "box",
                                    "briefcase",
                                    "browser",
                                    "bulb",
                                    "calendar",
                                    "clock",
                                    "cog",
                                    "components",
                                    "database",
                                    "doc",
                                    "email",
                                    "escalation-path",
                                    "files",
                                    "flag",
                                    "folder",
                                    "globe",
                                    "money",
                                    "server",
                                    "severity",
                                    "status-page",
                                    "store",
                                    "star",
                                    "tag",
                                    "user",
                                    "users"
                              ]
                        },
                        "id": {
                              "type": "string"
                        },
                        "is_editable": {
                              "type": "boolean"
                        },
                        "last_synced_at": {
                              "type": "string"
                        },
                        "name": {
                              "type": "string"
                        },
                        "ranked": {
                              "type": "boolean"
                        },
                        "registry_type": {
                              "type": "string"
                        },
                        "required_integrations": {
                              "type": "array",
                              "items": {
                                    "type": "string"
                              }
                        },
                        "schema": {
                              "type": "object",
                              "properties": {
                                    "attributes": {
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
                                                                  "properties": {
                                                                        "attribute_id": {
                                                                              "type": "string"
                                                                        },
                                                                        "attribute_name": {
                                                                              "type": "string"
                                                                        }
                                                                  },
                                                                  "required": [
                                                                        "attribute_id",
                                                                        "attribute_name"
                                                                  ]
                                                            }
                                                      },
                                                      "type": {
                                                            "type": "string"
                                                      }
                                                },
                                                "required": [
                                                      "id",
                                                      "mode",
                                                      "name",
                                                      "type",
                                                      "array"
                                                ]
                                          }
                                    },
                                    "version": {
                                          "type": "number"
                                    }
                              },
                              "required": [
                                    "attributes",
                                    "version"
                              ]
                        },
                        "semantic_type": {
                              "type": "string"
                        },
                        "source_repo_url": {
                              "type": "string"
                        },
                        "type_name": {
                              "type": "string"
                        },
                        "updated_at": {
                              "type": "string"
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
            "catalog_type",
            "catalog_entry"
      ]
},
    },
  },
};

export default catalogV2_UpdateEntry;
