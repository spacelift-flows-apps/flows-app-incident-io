import { AppBlock, events } from "@slflows/sdk/v1";

const alertsV2_Show: AppBlock = {
  name: "Show Alerts V2",
  description: `Show a single alert for your account`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "Unique identifier for the alert",
            "type": "string",
            "required": true
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/alerts/{id}";
        url = url.replace("{id}", encodeURIComponent(String(input.event.inputConfig.id)));
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
            "alert": {
                  "type": "object",
                  "properties": {
                        "alert_source_id": {
                              "type": "string"
                        },
                        "attributes": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "array_value": {
                                                "type": "array",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "catalog_entry": {
                                                                  "type": "object",
                                                                  "properties": {
                                                                        "catalog_type_id": {
                                                                              "type": "string"
                                                                        },
                                                                        "id": {
                                                                              "type": "string"
                                                                        },
                                                                        "name": {
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
                                                            "label": {
                                                                  "type": "string"
                                                            },
                                                            "literal": {
                                                                  "type": "string"
                                                            }
                                                      },
                                                      "additionalProperties": true
                                                }
                                          },
                                          "attribute": {
                                                "type": "object",
                                                "properties": {
                                                      "array": {
                                                            "type": "boolean"
                                                      },
                                                      "id": {
                                                            "type": "string"
                                                      },
                                                      "name": {
                                                            "type": "string"
                                                      },
                                                      "required": {
                                                            "type": "boolean"
                                                      },
                                                      "type": {
                                                            "type": "string"
                                                      }
                                                },
                                                "required": [
                                                      "id",
                                                      "name",
                                                      "type",
                                                      "array",
                                                      "required"
                                                ]
                                          },
                                          "value": {
                                                "type": "object",
                                                "properties": {
                                                      "catalog_entry": {
                                                            "type": "object",
                                                            "properties": {
                                                                  "catalog_type_id": {
                                                                        "type": "string"
                                                                  },
                                                                  "id": {
                                                                        "type": "string"
                                                                  },
                                                                  "name": {
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
                                                      "label": {
                                                            "type": "string"
                                                      },
                                                      "literal": {
                                                            "type": "string"
                                                      }
                                                },
                                                "additionalProperties": true
                                          }
                                    },
                                    "required": [
                                          "attribute"
                                    ]
                              }
                        },
                        "created_at": {
                              "type": "string"
                        },
                        "deduplication_key": {
                              "type": "string"
                        },
                        "description": {
                              "type": "string"
                        },
                        "id": {
                              "type": "string"
                        },
                        "resolved_at": {
                              "type": "string"
                        },
                        "source_url": {
                              "type": "string"
                        },
                        "status": {
                              "type": "string",
                              "enum": [
                                    "firing",
                                    "resolved"
                              ]
                        },
                        "title": {
                              "type": "string"
                        },
                        "updated_at": {
                              "type": "string"
                        }
                  },
                  "required": [
                        "id",
                        "alert_source_id",
                        "alert_source_config_id",
                        "source_type",
                        "deduplication_key",
                        "status",
                        "title",
                        "attribute_values",
                        "attributes",
                        "evaluation_failures",
                        "alert_source",
                        "created_at",
                        "updated_at",
                        "themes",
                        "can_resolve"
                  ]
            }
      },
      "required": [
            "alert"
      ]
},
    },
  },
};

export default alertsV2_Show;
