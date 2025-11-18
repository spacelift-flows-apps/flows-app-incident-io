import { AppBlock, events } from "@slflows/sdk/v1";

const schedulesV2_List: AppBlock = {
  name: "List Schedules V2",
  description: `List configured schedules.`,
  category: "Schedules V2",

  inputs: {
    default: {
      config: {
      "page_size": {
            "name": "Page Size",
            "description": "Integer number of records to return",
            "type": "number",
            "required": false
      },
      "after": {
            "name": "After",
            "description": "A schedule's ID. This endpoint will return a list of schedules after this ID in relation to the API response order.",
            "type": "string",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/schedules";
        const queryParams = new URLSearchParams();
        if (input.event.inputConfig.page_size !== undefined) {
          queryParams.append("page_size", String(input.event.inputConfig.page_size));
        }
        if (input.event.inputConfig.after !== undefined) {
          queryParams.append("after", String(input.event.inputConfig.after));
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
            "pagination_meta": {
                  "type": "object",
                  "properties": {
                        "after": {
                              "type": "string"
                        },
                        "page_size": {
                              "type": "number"
                        },
                        "total_record_count": {
                              "type": "number"
                        }
                  },
                  "required": [
                        "page_size"
                  ]
            },
            "schedules": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "annotations": {
                                    "type": "object",
                                    "additionalProperties": true
                              },
                              "config": {
                                    "type": "object",
                                    "properties": {
                                          "rotations": {
                                                "type": "array",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "effective_from": {
                                                                  "type": "string"
                                                            },
                                                            "handover_start_at": {
                                                                  "type": "string"
                                                            },
                                                            "handovers": {
                                                                  "type": "array",
                                                                  "items": {
                                                                        "type": "object",
                                                                        "properties": {
                                                                              "interval": {
                                                                                    "type": "number"
                                                                              },
                                                                              "interval_type": {
                                                                                    "type": "string",
                                                                                    "enum": [
                                                                                          "hourly",
                                                                                          "daily",
                                                                                          "weekly"
                                                                                    ]
                                                                              }
                                                                        },
                                                                        "additionalProperties": true
                                                                  }
                                                            },
                                                            "id": {
                                                                  "type": "string"
                                                            },
                                                            "layers": {
                                                                  "type": "array",
                                                                  "items": {
                                                                        "type": "object",
                                                                        "properties": {
                                                                              "id": {
                                                                                    "type": "string"
                                                                              },
                                                                              "name": {
                                                                                    "type": "string"
                                                                              }
                                                                        },
                                                                        "additionalProperties": true
                                                                  }
                                                            },
                                                            "name": {
                                                                  "type": "string"
                                                            },
                                                            "scheduling_mode": {
                                                                  "type": "string",
                                                                  "enum": [
                                                                        "fair",
                                                                        "sequential"
                                                                  ]
                                                            },
                                                            "users": {
                                                                  "type": "array",
                                                                  "items": {
                                                                        "type": "object",
                                                                        "properties": {
                                                                              "email": {
                                                                                    "type": "string"
                                                                              },
                                                                              "id": {
                                                                                    "type": "string"
                                                                              },
                                                                              "name": {
                                                                                    "type": "string"
                                                                              },
                                                                              "role": {
                                                                                    "type": "string",
                                                                                    "enum": [
                                                                                          "viewer",
                                                                                          "responder",
                                                                                          "administrator",
                                                                                          "owner",
                                                                                          "unset"
                                                                                    ]
                                                                              },
                                                                              "slack_user_id": {
                                                                                    "type": "string"
                                                                              }
                                                                        },
                                                                        "required": [
                                                                              "role",
                                                                              "id",
                                                                              "slack_role",
                                                                              "name",
                                                                              "deprecated_base_role",
                                                                              "organisation_id"
                                                                        ]
                                                                  }
                                                            },
                                                            "working_interval": {
                                                                  "type": "array",
                                                                  "items": {
                                                                        "type": "object",
                                                                        "properties": {
                                                                              "end_time": {
                                                                                    "type": "string"
                                                                              },
                                                                              "start_time": {
                                                                                    "type": "string"
                                                                              },
                                                                              "weekday": {
                                                                                    "type": "string",
                                                                                    "enum": [
                                                                                          "monday",
                                                                                          "tuesday",
                                                                                          "wednesday",
                                                                                          "thursday",
                                                                                          "friday",
                                                                                          "saturday",
                                                                                          "sunday"
                                                                                    ]
                                                                              }
                                                                        },
                                                                        "required": [
                                                                              "weekday",
                                                                              "start_time",
                                                                              "end_time"
                                                                        ]
                                                                  }
                                                            },
                                                            "working_intervals": {
                                                                  "type": "array",
                                                                  "items": {
                                                                        "type": "object",
                                                                        "properties": {
                                                                              "end_time": {
                                                                                    "type": "string"
                                                                              },
                                                                              "start_time": {
                                                                                    "type": "string"
                                                                              },
                                                                              "weekday": {
                                                                                    "type": "string",
                                                                                    "enum": [
                                                                                          "monday",
                                                                                          "tuesday",
                                                                                          "wednesday",
                                                                                          "thursday",
                                                                                          "friday",
                                                                                          "saturday",
                                                                                          "sunday"
                                                                                    ]
                                                                              }
                                                                        },
                                                                        "required": [
                                                                              "weekday",
                                                                              "start_time",
                                                                              "end_time"
                                                                        ]
                                                                  }
                                                            }
                                                      },
                                                      "required": [
                                                            "id",
                                                            "name",
                                                            "layers",
                                                            "user_ids",
                                                            "users",
                                                            "working_intervals",
                                                            "handover_start_at",
                                                            "handovers"
                                                      ]
                                                }
                                          }
                                    },
                                    "required": [
                                          "rotations",
                                          "version"
                                    ]
                              },
                              "created_at": {
                                    "type": "string"
                              },
                              "current_shifts": {
                                    "type": "array",
                                    "items": {
                                          "type": "object",
                                          "properties": {
                                                "end_at": {
                                                      "type": "string"
                                                },
                                                "entry_id": {
                                                      "type": "string"
                                                },
                                                "fingerprint": {
                                                      "type": "string"
                                                },
                                                "layer_id": {
                                                      "type": "string"
                                                },
                                                "rotation_id": {
                                                      "type": "string"
                                                },
                                                "start_at": {
                                                      "type": "string"
                                                },
                                                "user": {
                                                      "type": "object",
                                                      "properties": {
                                                            "email": {
                                                                  "type": "string"
                                                            },
                                                            "id": {
                                                                  "type": "string"
                                                            },
                                                            "name": {
                                                                  "type": "string"
                                                            },
                                                            "role": {
                                                                  "type": "string",
                                                                  "enum": [
                                                                        "viewer",
                                                                        "responder",
                                                                        "administrator",
                                                                        "owner",
                                                                        "unset"
                                                                  ]
                                                            },
                                                            "slack_user_id": {
                                                                  "type": "string"
                                                            }
                                                      },
                                                      "required": [
                                                            "role",
                                                            "id",
                                                            "slack_role",
                                                            "name",
                                                            "deprecated_base_role",
                                                            "organisation_id"
                                                      ]
                                                }
                                          },
                                          "required": [
                                                "user_id",
                                                "external_user_id",
                                                "start_at",
                                                "end_at"
                                          ]
                                    }
                              },
                              "holidays_public_config": {
                                    "type": "object",
                                    "properties": {
                                          "country_codes": {
                                                "type": "array",
                                                "items": {
                                                      "type": "string"
                                                }
                                          }
                                    },
                                    "required": [
                                          "country_codes"
                                    ]
                              },
                              "id": {
                                    "type": "string"
                              },
                              "name": {
                                    "type": "string"
                              },
                              "team_ids": {
                                    "type": "array",
                                    "items": {
                                          "type": "string"
                                    }
                              },
                              "timezone": {
                                    "type": "string"
                              },
                              "updated_at": {
                                    "type": "string"
                              }
                        },
                        "required": [
                              "id",
                              "name",
                              "timezone",
                              "external_provider",
                              "external_provider_id",
                              "team_ids",
                              "created_at",
                              "updated_at",
                              "annotations",
                              "managed_by"
                        ]
                  }
            }
      },
      "required": [
            "schedules"
      ]
},
    },
  },
};

export default schedulesV2_List;
