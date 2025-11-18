import { AppBlock, events } from "@slflows/sdk/v1";

const workflowsV2_ListWorkflows: AppBlock = {
  name: "ListWorkflows Workflows V2",
  description: `List all workflows`,
  category: "Workflows V2",

  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/workflows";
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
            "workflows": {
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
                                                      "type": "array",
                                                      "items": {
                                                            "type": "object",
                                                            "properties": {
                                                                  "operation": {
                                                                        "type": "object",
                                                                        "properties": {
                                                                              "label": {
                                                                                    "type": "string"
                                                                              },
                                                                              "value": {
                                                                                    "type": "string"
                                                                              }
                                                                        },
                                                                        "required": [
                                                                              "label",
                                                                              "value",
                                                                              "sort_key"
                                                                        ]
                                                                  },
                                                                  "param_bindings": {
                                                                        "type": "array",
                                                                        "items": {
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
                                                                  "subject": {
                                                                        "type": "object",
                                                                        "properties": {
                                                                              "label": {
                                                                                    "type": "string"
                                                                              },
                                                                              "reference": {
                                                                                    "type": "string"
                                                                              }
                                                                        },
                                                                        "required": [
                                                                              "label",
                                                                              "icon",
                                                                              "reference"
                                                                        ]
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
                              },
                              "continue_on_step_error": {
                                    "type": "boolean"
                              },
                              "delay": {
                                    "type": "object",
                                    "properties": {
                                          "conditions_apply_over_delay": {
                                                "type": "boolean"
                                          },
                                          "for_seconds": {
                                                "type": "number"
                                          }
                                    },
                                    "required": [
                                          "for_seconds",
                                          "conditions_apply_over_delay"
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
                                                                                                "result": {
                                                                                                      "type": "object",
                                                                                                      "properties": {
                                                                                                            "array_value": {
                                                                                                                  "type": "array",
                                                                                                                  "items": {
                                                                                                                        "type": "object",
                                                                                                                        "properties": {
                                                                                                                              "label": {
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
                                                                                                                              },
                                                                                                                              "literal": {
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
                                                                                                                              },
                                                                                                                              "reference": {
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
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
                                                                                                                        "properties": {
                                                                                                                              "label": {
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
                                                                                                                              },
                                                                                                                              "value": {
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
                                                                                                                              }
                                                                                                                        },
                                                                                                                        "required": [
                                                                                                                              "label",
                                                                                                                              "value",
                                                                                                                              "sort_key"
                                                                                                                        ]
                                                                                                                  },
                                                                                                                  "param_bindings": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "subject": {
                                                                                                                        "type": "object",
                                                                                                                        "properties": {
                                                                                                                              "label": {
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
                                                                                                                              },
                                                                                                                              "reference": {
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
                                                                                                                              }
                                                                                                                        },
                                                                                                                        "required": [
                                                                                                                              "label",
                                                                                                                              "icon",
                                                                                                                              "reference"
                                                                                                                        ]
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
                              "folder": {
                                    "type": "string"
                              },
                              "id": {
                                    "type": "string"
                              },
                              "include_private_incidents": {
                                    "type": "boolean"
                              },
                              "name": {
                                    "type": "string"
                              },
                              "once_for": {
                                    "type": "array",
                                    "items": {
                                          "type": "object",
                                          "properties": {
                                                "array": {
                                                      "type": "boolean"
                                                },
                                                "key": {
                                                      "type": "string"
                                                },
                                                "label": {
                                                      "type": "string"
                                                },
                                                "type": {
                                                      "type": "string"
                                                }
                                          },
                                          "required": [
                                                "key",
                                                "label",
                                                "node_label",
                                                "type",
                                                "hide_filter",
                                                "array"
                                          ]
                                    }
                              },
                              "runs_from": {
                                    "type": "string"
                              },
                              "runs_on_incident_modes": {
                                    "type": "array",
                                    "items": {
                                          "type": "string",
                                          "enum": [
                                                "standard",
                                                "test",
                                                "retrospective"
                                          ]
                                    }
                              },
                              "runs_on_incidents": {
                                    "type": "string",
                                    "enum": [
                                          "newly_created",
                                          "newly_created_and_active"
                                    ]
                              },
                              "shortform": {
                                    "type": "string"
                              },
                              "state": {
                                    "type": "string",
                                    "enum": [
                                          "active",
                                          "disabled",
                                          "draft",
                                          "error"
                                    ]
                              },
                              "steps": {
                                    "type": "array",
                                    "items": {
                                          "type": "object",
                                          "properties": {
                                                "label": {
                                                      "type": "string"
                                                },
                                                "name": {
                                                      "type": "string"
                                                }
                                          },
                                          "required": [
                                                "name",
                                                "label",
                                                "group_label",
                                                "organisation_is_eligible",
                                                "release_channel",
                                                "description",
                                                "params"
                                          ]
                                    }
                              },
                              "trigger": {
                                    "type": "object",
                                    "properties": {
                                          "label": {
                                                "type": "string"
                                          },
                                          "name": {
                                                "type": "string"
                                          }
                                    },
                                    "required": [
                                          "name",
                                          "icon",
                                          "label",
                                          "group_label",
                                          "when_description",
                                          "default_once_for",
                                          "default_condition_groups",
                                          "scope"
                                    ]
                              },
                              "version": {
                                    "type": "number"
                              }
                        },
                        "required": [
                              "id",
                              "organisation_id",
                              "name",
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
            }
      },
      "required": [
            "workflows"
      ]
},
    },
  },
};

export default workflowsV2_ListWorkflows;
