import { AppBlock, events } from "@slflows/sdk/v1";

const catalogV3_CreateType: AppBlock = {
  name: "CreateType Catalog V3",
  description: `Create a catalog type. The schema must be updated using the UpdateTypeSchema endpoint.`,
  category: "API",

  inputs: {
    default: {
      config: {
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
      },
      "type_name": {
            "name": "Type Name",
            "description": "The type name of this catalog type, to be used when defining attributes. This is immutable once a CatalogType has been created. For non-externally sync types, it must follow the pattern Custom[\"SomeName\"]",
            "type": "string",
            "required": false
      },
      "use_name_as_identifier": {
            "name": "Use Name As Identifier",
            "description": "If enabled, you can refer to entries of this type by their name, as well as their external ID and any aliases.",
            "type": "boolean",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v3/catalog_types";
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
        if (input.event.inputConfig.type_name !== undefined) {
          body.type_name = input.event.inputConfig.type_name;
        }
        if (input.event.inputConfig.use_name_as_identifier !== undefined) {
          body.use_name_as_identifier = input.event.inputConfig.use_name_as_identifier;
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
            }
      },
      "required": [
            "catalog_type"
      ]
},
    },
  },
};

export default catalogV3_CreateType;
