import { AppBlock, events } from "@slflows/sdk/v1";

const catalogV3_ListEntries: AppBlock = {
  name: "ListEntries Catalog V3",
  description: `List entries for a catalog type.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "catalog_type_id": {
            "name": "Catalog Type Id",
            "description": "ID of this catalog type",
            "type": "string",
            "required": true
      },
      "page_size": {
            "name": "Page Size",
            "description": "The integer number of records to return",
            "type": "number",
            "required": true
      },
      "after": {
            "name": "After",
            "description": "An record's ID. This endpoint will return a list of records after this ID in relation to the API response order.",
            "type": "string",
            "required": false
      },
      "identifier": {
            "name": "Identifier",
            "description": "If specified, only entries with this identifier will be returned. This will search by ID, external ID, and aliases.\n\nIf 'use name as identifier' is enabled for the catalog type, this will also match on name.",
            "type": "string",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v3/catalog_entries";
        const queryParams = new URLSearchParams();
        if (input.event.inputConfig.catalog_type_id !== undefined) {
          queryParams.append("catalog_type_id", String(input.event.inputConfig.catalog_type_id));
        }
        if (input.event.inputConfig.page_size !== undefined) {
          queryParams.append("page_size", String(input.event.inputConfig.page_size));
        }
        if (input.event.inputConfig.after !== undefined) {
          queryParams.append("after", String(input.event.inputConfig.after));
        }
        if (input.event.inputConfig.identifier !== undefined) {
          queryParams.append("identifier", String(input.event.inputConfig.identifier));
        }
        if (queryParams.toString()) url += "?" + queryParams.toString();
        const headers: Record<string, string> = {};

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            ...headers,
          },
          
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
            "catalog_entries": {
                  "type": "array",
                  "items": {
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
                  }
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
                                                                  "api",
                                                                  "dashboard",
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
                        "source_repo_url": {
                              "type": "string"
                        },
                        "type_name": {
                              "type": "string"
                        },
                        "updated_at": {
                              "type": "string"
                        },
                        "use_name_as_identifier": {
                              "type": "boolean"
                        }
                  },
                  "required": [
                        "id",
                        "name",
                        "description",
                        "type_name",
                        "ranked",
                        "schema",
                        "icon",
                        "categories",
                        "color",
                        "is_editable",
                        "annotations",
                        "created_at",
                        "updated_at",
                        "use_name_as_identifier",
                        "engine_resource_type",
                        "mode"
                  ]
            },
            "pagination_meta": {
                  "type": "object",
                  "properties": {
                        "after": {
                              "type": "string"
                        },
                        "page_size": {
                              "type": "number"
                        }
                  },
                  "required": [
                        "page_size"
                  ]
            }
      },
      "required": [
            "catalog_type",
            "catalog_entries",
            "pagination_meta"
      ]
},
    },
  },
};

export default catalogV3_ListEntries;
