import { AppBlock, events } from "@slflows/sdk/v1";

const escalationsV2_List: AppBlock = {
  name: "List Escalations V2",
  description: `List all escalations for your account.`,
  category: "Escalations V2",

  inputs: {
    default: {
      config: {
      "page_size": {
            "name": "Page Size",
            "description": "Number of escalations to return per page",
            "type": "number",
            "required": false
      },
      "after": {
            "name": "After",
            "description": "An escalation's ID. This endpoint will return a list of escalations after this ID in relation to the API response order.",
            "type": "string",
            "required": false
      },
      "escalation_path": {
            "name": "Escalation Path",
            "description": "Filter on the escalation path for which the escalation was triggered. Accepted operators are 'one_of' and 'not_in'.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "status": {
            "name": "Status",
            "description": "Filter on the status of the escalation. Accepted operators are 'one_of' and 'not_in'.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "alert": {
            "name": "Alert",
            "description": "Filter on the alert that created an escalation. Accepted operators are 'one_of' and 'not_in'.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "created_at": {
            "name": "Created At",
            "description": "Filter on the created_at timestamp of the escalation. Accepted operators are 'gte', 'lte' and 'date_range'.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "updated_at": {
            "name": "Updated At",
            "description": "Filter on the updated_at timestamp of the escalation. Accepted operators are 'gte', 'lte' and 'date_range'.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/escalations";
        const queryParams = new URLSearchParams();
        if (input.event.inputConfig.page_size !== undefined) {
          queryParams.append("page_size", String(input.event.inputConfig.page_size));
        }
        if (input.event.inputConfig.after !== undefined) {
          queryParams.append("after", String(input.event.inputConfig.after));
        }
        if (input.event.inputConfig.escalation_path !== undefined) {
          queryParams.append("escalation_path", String(input.event.inputConfig.escalation_path));
        }
        if (input.event.inputConfig.status !== undefined) {
          queryParams.append("status", String(input.event.inputConfig.status));
        }
        if (input.event.inputConfig.alert !== undefined) {
          queryParams.append("alert", String(input.event.inputConfig.alert));
        }
        if (input.event.inputConfig.created_at !== undefined) {
          queryParams.append("created_at", String(input.event.inputConfig.created_at));
        }
        if (input.event.inputConfig.updated_at !== undefined) {
          queryParams.append("updated_at", String(input.event.inputConfig.updated_at));
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
            "escalations": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "created_at": {
                                    "type": "string"
                              },
                              "creator": {
                                    "type": "object",
                                    "properties": {
                                          "alert": {
                                                "type": "object",
                                                "properties": {
                                                      "id": {
                                                            "type": "string"
                                                      },
                                                      "title": {
                                                            "type": "string"
                                                      }
                                                },
                                                "required": [
                                                      "id",
                                                      "title",
                                                      "deduplication_key",
                                                      "alert_source_id",
                                                      "source_type",
                                                      "status",
                                                      "created_at",
                                                      "updated_at"
                                                ]
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
                                          },
                                          "workflow": {
                                                "type": "object",
                                                "properties": {
                                                      "id": {
                                                            "type": "string"
                                                      },
                                                      "name": {
                                                            "type": "string"
                                                      }
                                                },
                                                "required": [
                                                      "id",
                                                      "name",
                                                      "organisation_id",
                                                      "trigger",
                                                      "once_for",
                                                      "version",
                                                      "expressions",
                                                      "condition_groups",
                                                      "steps",
                                                      "include_private_incidents",
                                                      "runs_on_incident_modes",
                                                      "continue_on_step_error",
                                                      "runs_on_incidents",
                                                      "state"
                                                ]
                                          }
                                    },
                                    "additionalProperties": true
                              },
                              "escalation_path_id": {
                                    "type": "string"
                              },
                              "events": {
                                    "type": "array",
                                    "items": {
                                          "type": "object",
                                          "properties": {
                                                "channels": {
                                                      "type": "array",
                                                      "items": {
                                                            "type": "object",
                                                            "properties": {
                                                                  "microsoft_teams_channel_id": {
                                                                        "type": "string"
                                                                  },
                                                                  "microsoft_teams_team_id": {
                                                                        "type": "string"
                                                                  },
                                                                  "slack_channel_id": {
                                                                        "type": "string"
                                                                  },
                                                                  "slack_team_id": {
                                                                        "type": "string"
                                                                  }
                                                            },
                                                            "required": [
                                                                  "id",
                                                                  "platform",
                                                                  "platform_label",
                                                                  "created_at",
                                                                  "updated_at"
                                                            ]
                                                      }
                                                },
                                                "event": {
                                                      "type": "string",
                                                      "enum": [
                                                            "entered_grace_period",
                                                            "triggered",
                                                            "notified_users",
                                                            "notified_channels",
                                                            "acked",
                                                            "cancelled",
                                                            "resolved",
                                                            "expired"
                                                      ]
                                                },
                                                "id": {
                                                      "type": "string"
                                                },
                                                "occurred_at": {
                                                      "type": "string"
                                                },
                                                "urgency": {
                                                      "type": "string",
                                                      "enum": [
                                                            "high",
                                                            "low"
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
                                                }
                                          },
                                          "required": [
                                                "id",
                                                "event",
                                                "occurred_at"
                                          ]
                                    }
                              },
                              "id": {
                                    "type": "string"
                              },
                              "priority": {
                                    "type": "object",
                                    "properties": {
                                          "name": {
                                                "type": "string"
                                          }
                                    },
                                    "required": [
                                          "name",
                                          "id",
                                          "rank",
                                          "slugs",
                                          "is_default"
                                    ]
                              },
                              "related_alerts": {
                                    "type": "array",
                                    "items": {
                                          "type": "object",
                                          "properties": {
                                                "alert_source_id": {
                                                      "type": "string"
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
                                                "title",
                                                "deduplication_key",
                                                "alert_source_id",
                                                "source_type",
                                                "status",
                                                "created_at",
                                                "updated_at"
                                          ]
                                    }
                              },
                              "related_incidents": {
                                    "type": "array",
                                    "items": {
                                          "type": "object",
                                          "properties": {
                                                "external_id": {
                                                      "type": "number"
                                                },
                                                "id": {
                                                      "type": "string"
                                                },
                                                "name": {
                                                      "type": "string"
                                                },
                                                "reference": {
                                                      "type": "string"
                                                },
                                                "status_category": {
                                                      "type": "string",
                                                      "enum": [
                                                            "triage",
                                                            "declined",
                                                            "merged",
                                                            "canceled",
                                                            "active",
                                                            "post-incident",
                                                            "closed",
                                                            "paused"
                                                      ]
                                                },
                                                "summary": {
                                                      "type": "string"
                                                },
                                                "visibility": {
                                                      "type": "string",
                                                      "enum": [
                                                            "public",
                                                            "private"
                                                      ]
                                                }
                                          },
                                          "required": [
                                                "id",
                                                "external_id",
                                                "name",
                                                "reference",
                                                "visibility",
                                                "status_category"
                                          ]
                                    }
                              },
                              "status": {
                                    "type": "string",
                                    "enum": [
                                          "pending",
                                          "triggered",
                                          "acked",
                                          "resolved",
                                          "expired",
                                          "cancelled"
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
                              "created_at",
                              "updated_at",
                              "status",
                              "title",
                              "priority",
                              "creator",
                              "events",
                              "related_incidents",
                              "related_alerts"
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
            "escalations",
            "pagination_meta"
      ]
},
    },
  },
};

export default escalationsV2_List;
