import { AppBlock, events } from "@slflows/sdk/v1";

const alertRoutesV2_Show: AppBlock = {
  name: "Show Alert Routes V2",
  description: `Load details about a specific alert route in your account.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "Unique identifier of the alert route",
            "type": "string",
            "required": true
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/alert_routes/{id}";
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
            "alert_route": {
                  "type": "object",
                  "properties": {
                        "alert_sources": {
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
                                          }
                                    },
                                    "required": [
                                          "alert_source_id",
                                          "condition_groups"
                                    ]
                              }
                        },
                        "channel_config": {
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
                                          "ms_teams_targets": {
                                                "type": "object",
                                                "properties": {
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
                                                      },
                                                      "channel_visibility": {
                                                            "type": "string"
                                                      }
                                                },
                                                "required": [
                                                      "binding",
                                                      "channel_visibility"
                                                ]
                                          },
                                          "slack_targets": {
                                                "type": "object",
                                                "properties": {
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
                                                      },
                                                      "channel_visibility": {
                                                            "type": "string"
                                                      }
                                                },
                                                "required": [
                                                      "binding",
                                                      "channel_visibility"
                                                ]
                                          }
                                    },
                                    "required": [
                                          "condition_groups"
                                    ]
                              }
                        },
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
                        "created_at": {
                              "type": "string"
                        },
                        "enabled": {
                              "type": "boolean"
                        },
                        "escalation_config": {
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
                                                      },
                                                      "users": {
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
                                                "additionalProperties": true
                                          }
                                    }
                              },
                              "required": [
                                    "auto_cancel_escalations",
                                    "escalation_targets"
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
                        "id": {
                              "type": "string"
                        },
                        "incident_config": {
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
                                                            "type": "string"
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
                        "incident_template": {
                              "type": "object",
                              "properties": {
                                    "custom_fields": {
                                          "type": "array",
                                          "items": {
                                                "type": "object",
                                                "properties": {
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
                                                      },
                                                      "custom_field_id": {
                                                            "type": "string"
                                                      },
                                                      "merge_strategy": {
                                                            "type": "string",
                                                            "enum": [
                                                                  "first-wins",
                                                                  "last-wins",
                                                                  "append"
                                                            ]
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
                                          "additionalProperties": true
                                    },
                                    "incident_type": {
                                          "type": "object",
                                          "properties": {
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
                                                "autogenerated"
                                          ]
                                    },
                                    "severity": {
                                          "type": "object",
                                          "properties": {
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
                                                "autogenerated"
                                          ]
                                    },
                                    "workspace": {
                                          "type": "object",
                                          "properties": {
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
                                          "additionalProperties": true
                                    }
                              },
                              "required": [
                                    "name"
                              ]
                        },
                        "is_private": {
                              "type": "boolean"
                        },
                        "name": {
                              "type": "string"
                        },
                        "updated_at": {
                              "type": "string"
                        },
                        "version": {
                              "type": "number"
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

export default alertRoutesV2_Show;
