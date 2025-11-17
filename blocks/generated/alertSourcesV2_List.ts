import { AppBlock, events } from "@slflows/sdk/v1";

const alertSourcesV2_List: AppBlock = {
  name: "List Alert Sources V2",
  description: `List all alert sources in your account.`,
  category: "API",

  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/alert_sources";
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
            "alert_sources": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "email_options": {
                                    "type": "object",
                                    "properties": {
                                          "email_address": {
                                                "type": "string"
                                          }
                                    },
                                    "required": [
                                          "email_address"
                                    ]
                              },
                              "http_custom_options": {
                                    "type": "object",
                                    "properties": {
                                          "deduplication_key_path": {
                                                "type": "string"
                                          },
                                          "transform_expression": {
                                                "type": "string"
                                          }
                                    },
                                    "required": [
                                          "transform_expression",
                                          "deduplication_key_path"
                                    ]
                              },
                              "id": {
                                    "type": "string"
                              },
                              "jira_options": {
                                    "type": "object",
                                    "properties": {
                                          "project_ids": {
                                                "type": "array",
                                                "items": {
                                                      "type": "string"
                                                }
                                          }
                                    },
                                    "required": [
                                          "project_ids"
                                    ]
                              },
                              "name": {
                                    "type": "string"
                              },
                              "secret_token": {
                                    "type": "string"
                              },
                              "source_type": {
                                    "type": "string",
                                    "enum": [
                                          "alertmanager",
                                          "app_optics",
                                          "azure_monitor",
                                          "bugsnag",
                                          "checkly",
                                          "chronosphere",
                                          "cloudwatch",
                                          "cloudflare",
                                          "coralogix",
                                          "cronitor",
                                          "crowdstrike_falcon",
                                          "datadog",
                                          "dynatrace",
                                          "elasticsearch",
                                          "email",
                                          "expel",
                                          "github_issue",
                                          "google_cloud",
                                          "grafana",
                                          "http",
                                          "http_custom",
                                          "honeycomb",
                                          "incoming_calls",
                                          "jira",
                                          "jsm",
                                          "monte_carlo",
                                          "nagios",
                                          "new_relic",
                                          "opsgenie",
                                          "prtg",
                                          "pager_duty",
                                          "panther",
                                          "pingdom",
                                          "runscope",
                                          "sns",
                                          "sentry",
                                          "sentry_metric",
                                          "splunk",
                                          "status_cake",
                                          "status_page_views",
                                          "sumo_logic",
                                          "uptime",
                                          "zendesk"
                                    ]
                              },
                              "template": {
                                    "type": "object",
                                    "properties": {
                                          "attributes": {
                                                "type": "array",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "alert_attribute_id": {
                                                                  "type": "string"
                                                            },
                                                            "binding": {
                                                                  "type": "object",
                                                                  "properties": {
                                                                        "array_value": {
                                                                              "type": "array",
                                                                              "items": {
                                                                                    "type": "object",
                                                                                    "properties": {
                                                                                          "label": {
                                                                                                "type": "string"
                                                                                          },
                                                                                          "literal": {
                                                                                                "type": "string"
                                                                                          },
                                                                                          "reference": {
                                                                                                "type": "string"
                                                                                          }
                                                                                    },
                                                                                    "required": [
                                                                                          "label",
                                                                                          "sort_key"
                                                                                    ]
                                                                              }
                                                                        },
                                                                        "value": {
                                                                              "type": "object",
                                                                              "properties": {
                                                                                    "label": {
                                                                                          "type": "string"
                                                                                    },
                                                                                    "literal": {
                                                                                          "type": "string"
                                                                                    },
                                                                                    "reference": {
                                                                                          "type": "string"
                                                                                    }
                                                                              },
                                                                              "required": [
                                                                                    "label",
                                                                                    "sort_key"
                                                                              ]
                                                                        }
                                                                  },
                                                                  "additionalProperties": true
                                                            }
                                                      },
                                                      "required": [
                                                            "alert_attribute_id",
                                                            "binding"
                                                      ]
                                                }
                                          },
                                          "description": {
                                                "type": "object",
                                                "properties": {
                                                      "label": {
                                                            "type": "string"
                                                      },
                                                      "literal": {
                                                            "type": "string"
                                                      },
                                                      "reference": {
                                                            "type": "string"
                                                      }
                                                },
                                                "required": [
                                                      "label",
                                                      "sort_key"
                                                ]
                                          },
                                          "expressions": {
                                                "type": "array",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "else_branch": {
                                                                  "type": "object",
                                                                  "properties": {
                                                                        "result": {
                                                                              "type": "object",
                                                                              "properties": {
                                                                                    "array_value": {
                                                                                          "type": "array",
                                                                                          "items": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "label": {
                                                                                                            "type": "string"
                                                                                                      },
                                                                                                      "literal": {
                                                                                                            "type": "string"
                                                                                                      },
                                                                                                      "reference": {
                                                                                                            "type": "string"
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "label",
                                                                                                      "sort_key"
                                                                                                ]
                                                                                          }
                                                                                    },
                                                                                    "value": {
                                                                                          "type": "object",
                                                                                          "properties": {
                                                                                                "label": {
                                                                                                      "type": "string"
                                                                                                },
                                                                                                "literal": {
                                                                                                      "type": "string"
                                                                                                },
                                                                                                "reference": {
                                                                                                      "type": "string"
                                                                                                }
                                                                                          },
                                                                                          "required": [
                                                                                                "label",
                                                                                                "sort_key"
                                                                                          ]
                                                                                    }
                                                                              },
                                                                              "additionalProperties": true
                                                                        }
                                                                  },
                                                                  "required": [
                                                                        "result"
                                                                  ]
                                                            },
                                                            "label": {
                                                                  "type": "string"
                                                            },
                                                            "operations": {
                                                                  "type": "array",
                                                                  "items": {
                                                                        "type": "object",
                                                                        "properties": {
                                                                              "branches": {
                                                                                    "type": "object",
                                                                                    "properties": {
                                                                                          "branches": {
                                                                                                "type": "array",
                                                                                                "items": {
                                                                                                      "type": "object",
                                                                                                      "properties": {
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
                                                                                                            "result": {
                                                                                                                  "type": "object",
                                                                                                                  "properties": {
                                                                                                                        "array_value": {
                                                                                                                              "type": "array",
                                                                                                                              "items": {
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
                                                                                                                              }
                                                                                                                        },
                                                                                                                        "value": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "additionalProperties": true
                                                                                                            }
                                                                                                      },
                                                                                                      "required": [
                                                                                                            "condition_groups",
                                                                                                            "result"
                                                                                                      ]
                                                                                                }
                                                                                          },
                                                                                          "returns": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "array": {
                                                                                                            "type": "boolean"
                                                                                                      },
                                                                                                      "type": {
                                                                                                            "type": "string"
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "type",
                                                                                                      "array"
                                                                                                ]
                                                                                          }
                                                                                    },
                                                                                    "required": [
                                                                                          "branches",
                                                                                          "returns"
                                                                                    ]
                                                                              },
                                                                              "filter": {
                                                                                    "type": "object",
                                                                                    "properties": {
                                                                                          "condition_groups": {
                                                                                                "type": "array",
                                                                                                "items": {
                                                                                                      "type": "object",
                                                                                                      "properties": {
                                                                                                            "conditions": {
                                                                                                                  "type": "array",
                                                                                                                  "items": {
                                                                                                                        "type": "object",
                                                                                                                        "properties": {
                                                                                                                              "operation": {
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
                                                                                                                              },
                                                                                                                              "param_bindings": {
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
                                                                                                                              },
                                                                                                                              "subject": {
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
                                                                                                                              }
                                                                                                                        },
                                                                                                                        "required": [
                                                                                                                              "subject",
                                                                                                                              "operation",
                                                                                                                              "params",
                                                                                                                              "param_bindings"
                                                                                                                        ]
                                                                                                                  }
                                                                                                            }
                                                                                                      },
                                                                                                      "required": [
                                                                                                            "conditions"
                                                                                                      ]
                                                                                                }
                                                                                          }
                                                                                    },
                                                                                    "required": [
                                                                                          "condition_groups"
                                                                                    ]
                                                                              },
                                                                              "navigate": {
                                                                                    "type": "object",
                                                                                    "properties": {
                                                                                          "reference": {
                                                                                                "type": "string"
                                                                                          },
                                                                                          "reference_label": {
                                                                                                "type": "string"
                                                                                          }
                                                                                    },
                                                                                    "required": [
                                                                                          "reference",
                                                                                          "reference_label"
                                                                                    ]
                                                                              },
                                                                              "operation_type": {
                                                                                    "type": "string",
                                                                                    "enum": [
                                                                                          "navigate",
                                                                                          "filter",
                                                                                          "concatenate",
                                                                                          "count",
                                                                                          "min",
                                                                                          "max",
                                                                                          "sum",
                                                                                          "random",
                                                                                          "first",
                                                                                          "parse",
                                                                                          "branches"
                                                                                    ]
                                                                              },
                                                                              "parse": {
                                                                                    "type": "object",
                                                                                    "properties": {
                                                                                          "returns": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "array": {
                                                                                                            "type": "boolean"
                                                                                                      },
                                                                                                      "type": {
                                                                                                            "type": "string"
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "type",
                                                                                                      "array"
                                                                                                ]
                                                                                          },
                                                                                          "source": {
                                                                                                "type": "string"
                                                                                          }
                                                                                    },
                                                                                    "required": [
                                                                                          "source",
                                                                                          "returns"
                                                                                    ]
                                                                              },
                                                                              "returns": {
                                                                                    "type": "object",
                                                                                    "properties": {
                                                                                          "array": {
                                                                                                "type": "boolean"
                                                                                          },
                                                                                          "type": {
                                                                                                "type": "string"
                                                                                          }
                                                                                    },
                                                                                    "required": [
                                                                                          "type",
                                                                                          "array"
                                                                                    ]
                                                                              }
                                                                        },
                                                                        "required": [
                                                                              "operation_type",
                                                                              "returns"
                                                                        ]
                                                                  }
                                                            },
                                                            "reference": {
                                                                  "type": "string"
                                                            },
                                                            "returns": {
                                                                  "type": "object",
                                                                  "properties": {
                                                                        "array": {
                                                                              "type": "boolean"
                                                                        },
                                                                        "type": {
                                                                              "type": "string"
                                                                        }
                                                                  },
                                                                  "required": [
                                                                        "type",
                                                                        "array"
                                                                  ]
                                                            },
                                                            "root_reference": {
                                                                  "type": "string"
                                                            }
                                                      },
                                                      "required": [
                                                            "label",
                                                            "reference",
                                                            "returns",
                                                            "root_reference",
                                                            "operations",
                                                            "id"
                                                      ]
                                                }
                                          },
                                          "title": {
                                                "type": "object",
                                                "properties": {
                                                      "label": {
                                                            "type": "string"
                                                      },
                                                      "literal": {
                                                            "type": "string"
                                                      },
                                                      "reference": {
                                                            "type": "string"
                                                      }
                                                },
                                                "required": [
                                                      "label",
                                                      "sort_key"
                                                ]
                                          }
                                    },
                                    "required": [
                                          "expressions",
                                          "title",
                                          "description",
                                          "attributes"
                                    ]
                              }
                        },
                        "required": [
                              "id",
                              "organisation_id",
                              "state",
                              "name",
                              "source_type",
                              "template",
                              "alert_source",
                              "created_at",
                              "updated_at",
                              "alert_route_ids",
                              "auto_ack_in_source",
                              "missing_required_attributes"
                        ]
                  }
            }
      },
      "required": [
            "alert_sources"
      ]
},
    },
  },
};

export default alertSourcesV2_List;
