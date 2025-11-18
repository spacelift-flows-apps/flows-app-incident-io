import { AppBlock, events } from "@slflows/sdk/v1";

const workflowsV2_UpdateWorkflow: AppBlock = {
  name: "UpdateWorkflow Workflows V2",
  description: `Updates a workflow`,
  category: "Workflows V2",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "ID of the workflow to update",
            "type": "string",
            "required": true
      },
      "annotations": {
            "name": "Annotations",
            "description": "Annotations that track metadata about this resource",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "condition_groups": {
            "name": "Condition Groups",
            "description": "Conditions that apply to the workflow trigger",
            "type": {
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
                                                      "type": "string"
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
                                                                                    "literal": {
                                                                                          "type": "string"
                                                                                    },
                                                                                    "reference": {
                                                                                          "type": "string"
                                                                                    }
                                                                              },
                                                                              "additionalProperties": true
                                                                        }
                                                                  },
                                                                  "value": {
                                                                        "type": "object",
                                                                        "properties": {
                                                                              "literal": {
                                                                                    "type": "string"
                                                                              },
                                                                              "reference": {
                                                                                    "type": "string"
                                                                              }
                                                                        },
                                                                        "additionalProperties": true
                                                                  }
                                                            },
                                                            "additionalProperties": true
                                                      }
                                                },
                                                "subject": {
                                                      "type": "string"
                                                }
                                          },
                                          "required": [
                                                "subject",
                                                "operation",
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
            "required": false
      },
      "continue_on_step_error": {
            "name": "Continue On Step Error",
            "description": "Whether to continue executing the workflow if a step fails",
            "type": "boolean",
            "required": false
      },
      "delay": {
            "name": "Delay",
            "description": "Request body field: delay",
            "type": {
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
            "required": false
      },
      "expressions": {
            "name": "Expressions",
            "description": "The expressions to use in the workflow",
            "type": {
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
                                                                        "literal": {
                                                                              "type": "string"
                                                                        },
                                                                        "reference": {
                                                                              "type": "string"
                                                                        }
                                                                  },
                                                                  "additionalProperties": true
                                                            }
                                                      },
                                                      "value": {
                                                            "type": "object",
                                                            "properties": {
                                                                  "literal": {
                                                                        "type": "string"
                                                                  },
                                                                  "reference": {
                                                                        "type": "string"
                                                                  }
                                                            },
                                                            "additionalProperties": true
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
                                                                                                            "properties": {
                                                                                                                  "operation": {
                                                                                                                        "type": "string"
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
                                                                                                                  "subject": {
                                                                                                                        "type": "string"
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "subject",
                                                                                                                  "operation",
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
                                                                              "result": {
                                                                                    "type": "object",
                                                                                    "properties": {
                                                                                          "array_value": {
                                                                                                "type": "array",
                                                                                                "items": {
                                                                                                      "type": "object",
                                                                                                      "properties": {
                                                                                                            "literal": {
                                                                                                                  "type": "string"
                                                                                                            },
                                                                                                            "reference": {
                                                                                                                  "type": "string"
                                                                                                            }
                                                                                                      },
                                                                                                      "additionalProperties": true
                                                                                                }
                                                                                          },
                                                                                          "value": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "literal": {
                                                                                                            "type": "string"
                                                                                                      },
                                                                                                      "reference": {
                                                                                                            "type": "string"
                                                                                                      }
                                                                                                },
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
                                                "concatenate": {
                                                      "type": "object",
                                                      "properties": {
                                                            "reference": {
                                                                  "type": "string"
                                                            }
                                                      },
                                                      "required": [
                                                            "reference"
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
                                                                                                      "type": "string"
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
                                                                                                                                    "literal": {
                                                                                                                                          "type": "string"
                                                                                                                                    },
                                                                                                                                    "reference": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "value": {
                                                                                                                        "type": "object",
                                                                                                                        "properties": {
                                                                                                                              "literal": {
                                                                                                                                    "type": "string"
                                                                                                                              },
                                                                                                                              "reference": {
                                                                                                                                    "type": "string"
                                                                                                                              }
                                                                                                                        },
                                                                                                                        "additionalProperties": true
                                                                                                                  }
                                                                                                            },
                                                                                                            "additionalProperties": true
                                                                                                      }
                                                                                                },
                                                                                                "subject": {
                                                                                                      "type": "string"
                                                                                                }
                                                                                          },
                                                                                          "required": [
                                                                                                "subject",
                                                                                                "operation",
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
                                                            }
                                                      },
                                                      "required": [
                                                            "reference"
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
      "folder": {
            "name": "Folder",
            "description": "Folder to display the workflow in",
            "type": "string",
            "required": false
      },
      "include_private_incidents": {
            "name": "Include Private Incidents",
            "description": "Whether to include private incidents",
            "type": "boolean",
            "required": false
      },
      "name": {
            "name": "Name",
            "description": "Name provided by the user when creating the workflow",
            "type": "string",
            "required": false
      },
      "once_for": {
            "name": "Once For",
            "description": "This workflow will run 'once for' a list of references",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "string"
                  }
            },
            "required": false
      },
      "runs_on_incident_modes": {
            "name": "Runs On Incident Modes",
            "description": "Which incident modes should this workflow run on? By default, workflows only run on standard incidents, but can also be configured to run on test and retrospective incidents.",
            "type": {
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
            "required": false
      },
      "runs_on_incidents": {
            "name": "Runs On Incidents",
            "description": "Which incidents should the workflow be applied to?",
            "type": "string",
            "required": false
      },
      "shortform": {
            "name": "Shortform",
            "description": "The shortform used to trigger this workflow (only applicable for manual triggers)",
            "type": "string",
            "required": false
      },
      "state": {
            "name": "State",
            "description": "What state this workflow is in",
            "type": "string",
            "required": false
      },
      "steps": {
            "name": "Steps",
            "description": "Steps that are executed as part of the workflow",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "for_each": {
                                    "type": "string"
                              },
                              "id": {
                                    "type": "string"
                              },
                              "name": {
                                    "type": "string"
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
                                                                  "literal": {
                                                                        "type": "string"
                                                                  },
                                                                  "reference": {
                                                                        "type": "string"
                                                                  }
                                                            },
                                                            "additionalProperties": true
                                                      }
                                                },
                                                "value": {
                                                      "type": "object",
                                                      "properties": {
                                                            "literal": {
                                                                  "type": "string"
                                                            },
                                                            "reference": {
                                                                  "type": "string"
                                                            }
                                                      },
                                                      "additionalProperties": true
                                                }
                                          },
                                          "additionalProperties": true
                                    }
                              }
                        },
                        "required": [
                              "id",
                              "name",
                              "param_bindings",
                              "organisation_is_eligible",
                              "release_channel",
                              "label",
                              "description",
                              "params",
                              "group_label"
                        ]
                  }
            },
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/workflows/{id}";
        url = url.replace("{id}", encodeURIComponent(String(input.event.inputConfig.id)));
        const body: Record<string, any> = {};
        if (input.event.inputConfig.annotations !== undefined) {
          body.annotations = input.event.inputConfig.annotations;
        }
        if (input.event.inputConfig.condition_groups !== undefined) {
          body.condition_groups = input.event.inputConfig.condition_groups;
        }
        if (input.event.inputConfig.continue_on_step_error !== undefined) {
          body.continue_on_step_error = input.event.inputConfig.continue_on_step_error;
        }
        if (input.event.inputConfig.delay !== undefined) {
          body.delay = input.event.inputConfig.delay;
        }
        if (input.event.inputConfig.expressions !== undefined) {
          body.expressions = input.event.inputConfig.expressions;
        }
        if (input.event.inputConfig.folder !== undefined) {
          body.folder = input.event.inputConfig.folder;
        }
        if (input.event.inputConfig.include_private_incidents !== undefined) {
          body.include_private_incidents = input.event.inputConfig.include_private_incidents;
        }
        if (input.event.inputConfig.name !== undefined) {
          body.name = input.event.inputConfig.name;
        }
        if (input.event.inputConfig.once_for !== undefined) {
          body.once_for = input.event.inputConfig.once_for;
        }
        if (input.event.inputConfig.runs_on_incident_modes !== undefined) {
          body.runs_on_incident_modes = input.event.inputConfig.runs_on_incident_modes;
        }
        if (input.event.inputConfig.runs_on_incidents !== undefined) {
          body.runs_on_incidents = input.event.inputConfig.runs_on_incidents;
        }
        if (input.event.inputConfig.shortform !== undefined) {
          body.shortform = input.event.inputConfig.shortform;
        }
        if (input.event.inputConfig.state !== undefined) {
          body.state = input.event.inputConfig.state;
        }
        if (input.event.inputConfig.steps !== undefined) {
          body.steps = input.event.inputConfig.steps;
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
            "management_meta": {
                  "type": "object",
                  "properties": {
                        "annotations": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "managed_by": {
                              "type": "string",
                              "enum": [
                                    "dashboard",
                                    "terraform",
                                    "external"
                              ]
                        },
                        "source_url": {
                              "type": "string"
                        }
                  },
                  "required": [
                        "annotations",
                        "managed_by"
                  ]
            },
            "workflow": {
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
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
                                                                                                                              },
                                                                                                                              "value": {
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
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
                                          "for_each": {
                                                "type": "string"
                                          },
                                          "id": {
                                                "type": "string"
                                          },
                                          "label": {
                                                "type": "string"
                                          },
                                          "name": {
                                                "type": "string"
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
                                          }
                                    },
                                    "required": [
                                          "id",
                                          "name",
                                          "label",
                                          "description",
                                          "params",
                                          "param_bindings",
                                          "organisation_is_eligible",
                                          "release_channel",
                                          "group_label"
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
                        "created_at",
                        "updated_at",
                        "state"
                  ]
            }
      },
      "required": [
            "workflow",
            "management_meta"
      ]
},
    },
  },
};

export default workflowsV2_UpdateWorkflow;
