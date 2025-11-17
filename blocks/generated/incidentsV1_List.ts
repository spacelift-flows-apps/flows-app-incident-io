import { AppBlock, events } from "@slflows/sdk/v1";

const incidentsV1_List: AppBlock = {
  name: "List Incidents V1",
  description: `List all incidents for an organisation.`,
  category: "API",

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
            "description": "An record's ID. This endpoint will return a list of records after this ID in relation to the API response order.",
            "type": "string",
            "required": false
      },
      "status": {
            "name": "Status",
            "description": "Filter for incidents in these statuses",
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

        let url = "https://api.incident.io/v1/incidents";
        const queryParams = new URLSearchParams();
        if (input.event.inputConfig.page_size !== undefined) {
          queryParams.append("page_size", String(input.event.inputConfig.page_size));
        }
        if (input.event.inputConfig.after !== undefined) {
          queryParams.append("after", String(input.event.inputConfig.after));
        }
        if (input.event.inputConfig.status !== undefined) {
          queryParams.append("status", String(input.event.inputConfig.status));
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
            "incidents": {
                  "type": "array",
                  "items": {
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
                                                                              "catalog_type_id",
                                                                              "name"
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
                                          "real",
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
                                          "rank",
                                          "created_at",
                                          "updated_at",
                                          "id",
                                          "name",
                                          "description"
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
                              "status": {
                                    "type": "string",
                                    "enum": [
                                          "triage",
                                          "investigating",
                                          "fixing",
                                          "monitoring",
                                          "closed",
                                          "declined"
                                    ]
                              },
                              "summary": {
                                    "type": "string"
                              },
                              "timestamps": {
                                    "type": "array",
                                    "items": {
                                          "type": "object",
                                          "properties": {
                                                "last_occurred_at": {
                                                      "type": "string"
                                                },
                                                "name": {
                                                      "type": "string"
                                                }
                                          },
                                          "required": [
                                                "name",
                                                "id",
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
                                    }
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
                              }
                        },
                        "required": [
                              "status",
                              "id",
                              "external_id",
                              "reference",
                              "name",
                              "incident_status",
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
            }
      },
      "required": [
            "incidents"
      ]
},
    },
  },
};

export default incidentsV1_List;
