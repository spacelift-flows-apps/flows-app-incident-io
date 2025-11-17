import { AppBlock, events } from "@slflows/sdk/v1";

const alertRoutesV2_Update: AppBlock = {
  name: "Update Alert Routes V2",
  description: `Update an existing alert route in your account.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "Unique identifier of the alert route",
            "type": "string",
            "required": true
      },
      "alert_sources": {
            "name": "Alert Sources",
            "description": "Which alert sources should this alert route match?",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "alert_source_id": {
                                    "type": "string"
                              },
                              "condition_groups": {
                                    "type": "array",
                                    "items": {
                                          "type": "object",
                                          "additionalProperties": true
                                    }
                              }
                        },
                        "required": [
                              "alert_source_id",
                              "condition_groups"
                        ]
                  }
            },
            "required": false
      },
      "channel_config": {
            "name": "Channel Config",
            "description": "The channel configuration for this alert route",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "condition_groups": {
                                    "type": "array",
                                    "items": {
                                          "type": "object",
                                          "additionalProperties": true
                                    }
                              },
                              "ms_teams_targets": {
                                    "type": "object",
                                    "additionalProperties": true
                              },
                              "slack_targets": {
                                    "type": "object",
                                    "additionalProperties": true
                              }
                        },
                        "required": [
                              "condition_groups"
                        ]
                  }
            },
            "required": false
      },
      "condition_groups": {
            "name": "Condition Groups",
            "description": "What condition groups must be true for this alert route to fire?",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "conditions": {
                                    "type": "array",
                                    "items": {
                                          "type": "object",
                                          "additionalProperties": true
                                    }
                              }
                        },
                        "required": [
                              "conditions"
                        ]
                  }
            },
            "required": false
      },
      "created_at": {
            "name": "Created At",
            "description": "The time of creation of this alert route",
            "type": "string",
            "required": false
      },
      "enabled": {
            "name": "Enabled",
            "description": "Whether this alert route is enabled or not",
            "type": "boolean",
            "required": false
      },
      "escalation_config": {
            "name": "Escalation Config",
            "description": "Request body field: escalation_config",
            "type": {
                  "type": "object",
                  "properties": {
                        "auto_cancel_escalations": {
                              "type": "boolean"
                        },
                        "escalation_targets": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "escalation_paths": {
                                                "type": "object",
                                                "additionalProperties": true
                                          },
                                          "users": {
                                                "type": "object",
                                                "additionalProperties": true
                                          }
                                    },
                                    "additionalProperties": true
                              }
                        }
                  },
                  "required": [
                        "auto_cancel_escalations",
                        "escalation_targets"
                  ]
            },
            "required": false
      },
      "expressions": {
            "name": "Expressions",
            "description": "The expressions used in this template",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "else_branch": {
                                    "type": "object",
                                    "additionalProperties": true
                              },
                              "label": {
                                    "type": "string"
                              },
                              "operations": {
                                    "type": "array",
                                    "items": {
                                          "type": "object",
                                          "additionalProperties": true
                                    }
                              },
                              "reference": {
                                    "type": "string"
                              },
                              "root_reference": {
                                    "type": "string"
                              }
                        },
                        "required": [
                              "label",
                              "reference",
                              "root_reference",
                              "operations"
                        ]
                  }
            },
            "required": false
      },
      "incident_config": {
            "name": "Incident Config",
            "description": "Request body field: incident_config",
            "type": {
                  "type": "object",
                  "properties": {
                        "auto_decline_enabled": {
                              "type": "boolean"
                        },
                        "condition_groups": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "conditions": {
                                                "type": "object",
                                                "additionalProperties": true
                                          }
                                    },
                                    "required": [
                                          "conditions"
                                    ]
                              }
                        },
                        "defer_time_seconds": {
                              "type": "number"
                        },
                        "enabled": {
                              "type": "boolean"
                        },
                        "grouping_keys": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "reference": {
                                                "type": "object",
                                                "additionalProperties": true
                                          }
                                    },
                                    "required": [
                                          "reference"
                                    ]
                              }
                        },
                        "grouping_window_seconds": {
                              "type": "number"
                        }
                  },
                  "required": [
                        "auto_decline_enabled",
                        "enabled",
                        "condition_groups",
                        "grouping_keys",
                        "grouping_window_seconds",
                        "defer_time_seconds"
                  ]
            },
            "required": false
      },
      "incident_template": {
            "name": "Incident Template",
            "description": "Request body field: incident_template",
            "type": {
                  "type": "object",
                  "properties": {
                        "custom_fields": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "binding": {
                                                "type": "object",
                                                "additionalProperties": true
                                          },
                                          "custom_field_id": {
                                                "type": "object",
                                                "additionalProperties": true
                                          },
                                          "merge_strategy": {
                                                "type": "object",
                                                "additionalProperties": true
                                          }
                                    },
                                    "required": [
                                          "custom_field_id",
                                          "binding",
                                          "merge_strategy"
                                    ]
                              }
                        },
                        "incident_mode": {
                              "type": "object",
                              "properties": {
                                    "binding": {
                                          "type": "object",
                                          "additionalProperties": true
                                    }
                              },
                              "additionalProperties": true
                        },
                        "incident_type": {
                              "type": "object",
                              "properties": {
                                    "binding": {
                                          "type": "object",
                                          "additionalProperties": true
                                    }
                              },
                              "additionalProperties": true
                        },
                        "name": {
                              "type": "object",
                              "properties": {
                                    "autogenerated": {
                                          "type": "boolean"
                                    },
                                    "binding": {
                                          "type": "object",
                                          "additionalProperties": true
                                    }
                              },
                              "additionalProperties": true
                        },
                        "severity": {
                              "type": "object",
                              "properties": {
                                    "binding": {
                                          "type": "object",
                                          "additionalProperties": true
                                    },
                                    "merge_strategy": {
                                          "type": "string",
                                          "enum": [
                                                "first-wins",
                                                "max"
                                          ]
                                    }
                              },
                              "required": [
                                    "merge_strategy"
                              ]
                        },
                        "start_in_triage": {
                              "type": "object",
                              "properties": {
                                    "binding": {
                                          "type": "object",
                                          "additionalProperties": true
                                    }
                              },
                              "additionalProperties": true
                        },
                        "summary": {
                              "type": "object",
                              "properties": {
                                    "autogenerated": {
                                          "type": "boolean"
                                    },
                                    "binding": {
                                          "type": "object",
                                          "additionalProperties": true
                                    }
                              },
                              "additionalProperties": true
                        },
                        "workspace": {
                              "type": "object",
                              "properties": {
                                    "binding": {
                                          "type": "object",
                                          "additionalProperties": true
                                    }
                              },
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "name"
                  ]
            },
            "required": false
      },
      "is_private": {
            "name": "Is Private",
            "description": "Whether this alert route is private. Private alert routes will only create private incidents from alerts.",
            "type": "boolean",
            "required": false
      },
      "name": {
            "name": "Name",
            "description": "The name of this alert route config, for the user's reference",
            "type": "string",
            "required": false
      },
      "updated_at": {
            "name": "Updated At",
            "description": "The time of last update of this alert route",
            "type": "string",
            "required": false
      },
      "version": {
            "name": "Version",
            "description": "The version of this alert route config",
            "type": "number",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/alert_routes/{id}";
        url = url.replace("{id}", encodeURIComponent(String(input.event.inputConfig.id)));
        const body: Record<string, any> = {};
        if (input.event.inputConfig.alert_sources !== undefined) {
          body.alert_sources = input.event.inputConfig.alert_sources;
        }
        if (input.event.inputConfig.channel_config !== undefined) {
          body.channel_config = input.event.inputConfig.channel_config;
        }
        if (input.event.inputConfig.condition_groups !== undefined) {
          body.condition_groups = input.event.inputConfig.condition_groups;
        }
        if (input.event.inputConfig.created_at !== undefined) {
          body.created_at = input.event.inputConfig.created_at;
        }
        if (input.event.inputConfig.enabled !== undefined) {
          body.enabled = input.event.inputConfig.enabled;
        }
        if (input.event.inputConfig.escalation_config !== undefined) {
          body.escalation_config = input.event.inputConfig.escalation_config;
        }
        if (input.event.inputConfig.expressions !== undefined) {
          body.expressions = input.event.inputConfig.expressions;
        }
        if (input.event.inputConfig.incident_config !== undefined) {
          body.incident_config = input.event.inputConfig.incident_config;
        }
        if (input.event.inputConfig.incident_template !== undefined) {
          body.incident_template = input.event.inputConfig.incident_template;
        }
        if (input.event.inputConfig.is_private !== undefined) {
          body.is_private = input.event.inputConfig.is_private;
        }
        if (input.event.inputConfig.name !== undefined) {
          body.name = input.event.inputConfig.name;
        }
        if (input.event.inputConfig.updated_at !== undefined) {
          body.updated_at = input.event.inputConfig.updated_at;
        }
        if (input.event.inputConfig.version !== undefined) {
          body.version = input.event.inputConfig.version;
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
            "alert_route": {
                  "type": "object",
                  "properties": {
                        "alert_sources": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "channel_config": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "condition_groups": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "created_at": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "enabled": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "escalation_config": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "expressions": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "incident_config": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "incident_template": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "is_private": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "name": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "updated_at": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "version": {
                              "type": "object",
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "id",
                        "name",
                        "condition_groups",
                        "expressions",
                        "is_private",
                        "enabled",
                        "escalation_config",
                        "incident_config",
                        "incident_template",
                        "alert_sources",
                        "channel_config",
                        "version"
                  ]
            }
      },
      "required": [
            "alert_route"
      ]
},
    },
  },
};

export default alertRoutesV2_Update;
