import { AppBlock, events } from "@slflows/sdk/v1";

const escalationsV2_Create: AppBlock = {
  name: "Create Escalations V2",
  description: `Create an escalation.`,
  category: "Escalations V2",

  inputs: {
    default: {
      config: {
      "description": {
            "name": "Description",
            "description": "Additional details about the escalation",
            "type": "string",
            "required": false
      },
      "escalation_path_id": {
            "name": "Escalation Path Id",
            "description": "ID of the escalation path to follow",
            "type": "string",
            "required": false
      },
      "idempotency_key": {
            "name": "Idempotency Key",
            "description": "Unique key to prevent duplicate escalations. If this key has already been used, the existing escalation will be returned.",
            "type": "string",
            "required": false
      },
      "title": {
            "name": "Title",
            "description": "The title of the escalation. This message will be included in all notifications about this escalation.",
            "type": "string",
            "required": false
      },
      "user_ids": {
            "name": "User Ids",
            "description": "IDs of users to escalate directly to",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "string"
                  }
            },
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/escalations";
        const body: Record<string, any> = {};
        if (input.event.inputConfig.description !== undefined) {
          body.description = input.event.inputConfig.description;
        }
        if (input.event.inputConfig.escalation_path_id !== undefined) {
          body.escalation_path_id = input.event.inputConfig.escalation_path_id;
        }
        if (input.event.inputConfig.idempotency_key !== undefined) {
          body.idempotency_key = input.event.inputConfig.idempotency_key;
        }
        if (input.event.inputConfig.title !== undefined) {
          body.title = input.event.inputConfig.title;
        }
        if (input.event.inputConfig.user_ids !== undefined) {
          body.user_ids = input.event.inputConfig.user_ids;
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
            "escalation": {
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
      "required": [
            "escalation"
      ]
},
    },
  },
};

export default escalationsV2_Create;
