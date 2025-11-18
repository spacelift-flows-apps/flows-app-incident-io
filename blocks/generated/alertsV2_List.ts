import { AppBlock, events } from "@slflows/sdk/v1";

const alertsV2_List: AppBlock = {
  name: "List Alerts V2",
  description: `List all alerts for your account.`,
  category: "Alerts V2",

  inputs: {
    default: {
      config: {
      "page_size": {
            "name": "Page Size",
            "description": "Number of alerts to return per page",
            "type": "number",
            "required": true
      },
      "after": {
            "name": "After",
            "description": "If provided, pass this as the 'after' param to load the next page",
            "type": "string",
            "required": false
      },
      "deduplication_key": {
            "name": "Deduplication Key",
            "description": "Filter on alert deduplication key. The accepted operator is 'is'.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "status": {
            "name": "Status",
            "description": "Filter on alert status. The accepted operators are 'one_of', or 'not_in'.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "created_at": {
            "name": "Created At",
            "description": "Filter on alert created at timestamp. Accepted operators are 'gte', 'lte' and 'date_range'.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/alerts";
        const queryParams = new URLSearchParams();
        if (input.event.inputConfig.page_size !== undefined) {
          queryParams.append("page_size", String(input.event.inputConfig.page_size));
        }
        if (input.event.inputConfig.after !== undefined) {
          queryParams.append("after", String(input.event.inputConfig.after));
        }
        if (input.event.inputConfig.deduplication_key !== undefined) {
          queryParams.append("deduplication_key", String(input.event.inputConfig.deduplication_key));
        }
        if (input.event.inputConfig.status !== undefined) {
          queryParams.append("status", String(input.event.inputConfig.status));
        }
        if (input.event.inputConfig.created_at !== undefined) {
          queryParams.append("created_at", String(input.event.inputConfig.created_at));
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
            "alerts": {
                  "type": "array",
                  "items": {
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
            "alerts",
            "pagination_meta"
      ]
},
    },
  },
};

export default alertsV2_List;
