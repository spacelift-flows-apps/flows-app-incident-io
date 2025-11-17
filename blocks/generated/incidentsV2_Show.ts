import { AppBlock, events } from "@slflows/sdk/v1";

const incidentsV2_Show: AppBlock = {
  name: "Show Incidents V2",
  description: `Get a single incident.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "Unique identifier for the incident",
            "type": "string",
            "required": true
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/incidents/{id}";
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
            "incident": {
                  "type": "object",
                  "properties": {
                        "call_url": {
                              "type": "string"
                        },
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
                                    "api_key": {
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
                                                "roles",
                                                "created_by"
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
                        "custom_field_entries": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "custom_field": {
                                                "type": "object",
                                                "properties": {
                                                      "description": {
                                                            "type": "string"
                                                      },
                                                      "field_type": {
                                                            "type": "string",
                                                            "enum": [
                                                                  "single_select",
                                                                  "multi_select",
                                                                  "text",
                                                                  "link",
                                                                  "numeric"
                                                            ]
                                                      },
                                                      "id": {
                                                            "type": "string"
                                                      },
                                                      "name": {
                                                            "type": "string"
                                                      },
                                                      "options": {
                                                            "type": "array",
                                                            "items": {
                                                                  "type": "object",
                                                                  "properties": {
                                                                        "custom_field_id": {
                                                                              "type": "string"
                                                                        },
                                                                        "id": {
                                                                              "type": "string"
                                                                        },
                                                                        "sort_key": {
                                                                              "type": "number"
                                                                        },
                                                                        "value": {
                                                                              "type": "string"
                                                                        }
                                                                  },
                                                                  "required": [
                                                                        "id",
                                                                        "custom_field_id",
                                                                        "value",
                                                                        "sort_key"
                                                                  ]
                                                            }
                                                      }
                                                },
                                                "required": [
                                                      "id",
                                                      "organisation_id",
                                                      "name",
                                                      "description",
                                                      "dynamic_options",
                                                      "rank",
                                                      "field_type",
                                                      "cannot_be_unset",
                                                      "options",
                                                      "is_usable",
                                                      "condition_groups",
                                                      "field_mode",
                                                      "created_at",
                                                      "updated_at"
                                                ]
                                          },
                                          "values": {
                                                "type": "array",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "value_catalog_entry": {
                                                                  "type": "object",
                                                                  "properties": {
                                                                        "aliases": {
                                                                              "type": "array",
                                                                              "items": {
                                                                                    "type": "string"
                                                                              }
                                                                        },
                                                                        "external_id": {
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
                                                                        "name",
                                                                        "catalog_type_id"
                                                                  ]
                                                            },
                                                            "value_link": {
                                                                  "type": "string"
                                                            },
                                                            "value_numeric": {
                                                                  "type": "string"
                                                            },
                                                            "value_option": {
                                                                  "type": "object",
                                                                  "properties": {
                                                                        "custom_field_id": {
                                                                              "type": "string"
                                                                        },
                                                                        "id": {
                                                                              "type": "string"
                                                                        },
                                                                        "sort_key": {
                                                                              "type": "number"
                                                                        },
                                                                        "value": {
                                                                              "type": "string"
                                                                        }
                                                                  },
                                                                  "required": [
                                                                        "id",
                                                                        "custom_field_id",
                                                                        "value",
                                                                        "sort_key"
                                                                  ]
                                                            },
                                                            "value_text": {
                                                                  "type": "string"
                                                            }
                                                      },
                                                      "additionalProperties": true
                                                }
                                          }
                                    },
                                    "required": [
                                          "custom_field",
                                          "values"
                                    ]
                              }
                        },
                        "duration_metrics": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "duration_metric": {
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
                                                      "rank",
                                                      "from_timestamp_id",
                                                      "to_timestamp_id",
                                                      "metric_type",
                                                      "calculation_mode",
                                                      "created_at",
                                                      "updated_at",
                                                      "validate"
                                                ]
                                          },
                                          "value_seconds": {
                                                "type": "number"
                                          }
                                    },
                                    "required": [
                                          "duration_metric",
                                          "status"
                                    ]
                              }
                        },
                        "external_issue_reference": {
                              "type": "object",
                              "properties": {
                                    "issue_name": {
                                          "type": "string"
                                    },
                                    "issue_permalink": {
                                          "type": "string"
                                    },
                                    "provider": {
                                          "type": "string",
                                          "enum": [
                                                "asana",
                                                "azure_devops",
                                                "click_up",
                                                "linear",
                                                "jira",
                                                "jira_server",
                                                "github",
                                                "gitlab",
                                                "service_now",
                                                "shortcut"
                                          ]
                                    }
                              },
                              "required": [
                                    "provider",
                                    "issue_name",
                                    "issue_permalink"
                              ]
                        },
                        "has_debrief": {
                              "type": "boolean"
                        },
                        "id": {
                              "type": "string"
                        },
                        "incident_role_assignments": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "assignee": {
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
                                          "role": {
                                                "type": "object",
                                                "properties": {
                                                      "created_at": {
                                                            "type": "string"
                                                      },
                                                      "description": {
                                                            "type": "string"
                                                      },
                                                      "id": {
                                                            "type": "string"
                                                      },
                                                      "instructions": {
                                                            "type": "string"
                                                      },
                                                      "name": {
                                                            "type": "string"
                                                      },
                                                      "required": {
                                                            "type": "boolean"
                                                      },
                                                      "role_type": {
                                                            "type": "string",
                                                            "enum": [
                                                                  "lead",
                                                                  "reporter",
                                                                  "custom"
                                                            ]
                                                      },
                                                      "shortform": {
                                                            "type": "string"
                                                      },
                                                      "updated_at": {
                                                            "type": "string"
                                                      }
                                                },
                                                "required": [
                                                      "name",
                                                      "shortform",
                                                      "description",
                                                      "instructions",
                                                      "condition_groups",
                                                      "id",
                                                      "role_type",
                                                      "created_at",
                                                      "updated_at"
                                                ]
                                          }
                                    },
                                    "required": [
                                          "role"
                                    ]
                              }
                        },
                        "incident_status": {
                              "type": "object",
                              "properties": {
                                    "category": {
                                          "type": "string",
                                          "enum": [
                                                "triage",
                                                "declined",
                                                "merged",
                                                "canceled",
                                                "live",
                                                "learning",
                                                "closed",
                                                "paused"
                                          ]
                                    },
                                    "created_at": {
                                          "type": "string"
                                    },
                                    "description": {
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
                                    "name",
                                    "description",
                                    "rank",
                                    "category",
                                    "created_at",
                                    "updated_at"
                              ]
                        },
                        "incident_timestamp_values": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "incident_timestamp": {
                                                "type": "object",
                                                "properties": {
                                                      "id": {
                                                            "type": "string"
                                                      },
                                                      "name": {
                                                            "type": "string"
                                                      },
                                                      "rank": {
                                                            "type": "number"
                                                      }
                                                },
                                                "required": [
                                                      "id",
                                                      "name",
                                                      "description",
                                                      "rank",
                                                      "set_on_creation",
                                                      "set_on_acceptance",
                                                      "set_on_resolution",
                                                      "set_by_rules",
                                                      "timestamp_type",
                                                      "created_at",
                                                      "updated_at"
                                                ]
                                          },
                                          "value": {
                                                "type": "object",
                                                "properties": {
                                                      "value": {
                                                            "type": "string"
                                                      }
                                                },
                                                "required": [
                                                      "id",
                                                      "incident_id",
                                                      "incident_timestamp_id",
                                                      "created_at"
                                                ]
                                          }
                                    },
                                    "required": [
                                          "incident_timestamp"
                                    ]
                              }
                        },
                        "incident_type": {
                              "type": "object",
                              "properties": {
                                    "create_in_triage": {
                                          "type": "string",
                                          "enum": [
                                                "always",
                                                "optional"
                                          ]
                                    },
                                    "created_at": {
                                          "type": "string"
                                    },
                                    "description": {
                                          "type": "string"
                                    },
                                    "id": {
                                          "type": "string"
                                    },
                                    "is_default": {
                                          "type": "boolean"
                                    },
                                    "name": {
                                          "type": "string"
                                    },
                                    "private_incidents_only": {
                                          "type": "boolean"
                                    },
                                    "updated_at": {
                                          "type": "string"
                                    }
                              },
                              "required": [
                                    "id",
                                    "name",
                                    "is_default",
                                    "description",
                                    "private_incidents_only",
                                    "created_at",
                                    "updated_at",
                                    "create_in_triage",
                                    "severity_aliases",
                                    "rank",
                                    "override_auto_close_incidents",
                                    "auto_close_incidents",
                                    "auto_close_incidents_delay_days",
                                    "override_auto_archive_slack_channels",
                                    "auto_archive_slack_channels",
                                    "auto_archive_slack_channels_delay_days"
                              ]
                        },
                        "mode": {
                              "type": "string",
                              "enum": [
                                    "standard",
                                    "retrospective",
                                    "test",
                                    "tutorial"
                              ]
                        },
                        "name": {
                              "type": "string"
                        },
                        "permalink": {
                              "type": "string"
                        },
                        "postmortem_document_url": {
                              "type": "string"
                        },
                        "reference": {
                              "type": "string"
                        },
                        "severity": {
                              "type": "object",
                              "properties": {
                                    "created_at": {
                                          "type": "string"
                                    },
                                    "description": {
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
                                    "name",
                                    "description",
                                    "rank",
                                    "created_at",
                                    "updated_at"
                              ]
                        },
                        "slack_channel_id": {
                              "type": "string"
                        },
                        "slack_channel_name": {
                              "type": "string"
                        },
                        "slack_team_id": {
                              "type": "string"
                        },
                        "summary": {
                              "type": "string"
                        },
                        "updated_at": {
                              "type": "string"
                        },
                        "visibility": {
                              "type": "string",
                              "enum": [
                                    "public",
                                    "private"
                              ]
                        },
                        "workload_minutes_late": {
                              "type": "number"
                        },
                        "workload_minutes_sleeping": {
                              "type": "number"
                        },
                        "workload_minutes_total": {
                              "type": "number"
                        },
                        "workload_minutes_working": {
                              "type": "number"
                        }
                  },
                  "required": [
                        "incident_status",
                        "id",
                        "external_id",
                        "reference",
                        "name",
                        "idempotency_key",
                        "did_opt_out_of_post_incident_flow",
                        "visibility",
                        "mode",
                        "organisation_id",
                        "creator",
                        "last_activity_at",
                        "incident_role_assignments",
                        "custom_field_entries",
                        "slack_team_id",
                        "slack_channel_id",
                        "postmortem_status",
                        "created_at",
                        "updated_at",
                        "reported_at"
                  ]
            }
      },
      "required": [
            "incident"
      ]
},
    },
  },
};

export default incidentsV2_Show;
