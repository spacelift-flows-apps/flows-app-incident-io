import { AppBlock, events } from "@slflows/sdk/v1";

const escalationsV2_CreatePath: AppBlock = {
  name: "CreatePath Escalations V2",
  description: `Create an escalation path.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "name": {
            "name": "Name",
            "description": "The name of this escalation path, for the user's reference.",
            "type": "string",
            "required": false
      },
      "path": {
            "name": "Path",
            "description": "The nodes that form the levels and branches of this escalation path.",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "id": {
                                    "type": "string"
                              },
                              "if_else": {
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
                                          },
                                          "else_path": {
                                                "type": "array",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "id": {
                                                                  "type": "string"
                                                            },
                                                            "if_else": {
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
                                                                        },
                                                                        "else_path": {
                                                                              "type": "array",
                                                                              "items": {
                                                                                    "type": "object",
                                                                                    "properties": {
                                                                                          "id": {
                                                                                                "type": "string"
                                                                                          },
                                                                                          "if_else": {
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
                                                                                                                              "type": "string"
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "required": [
                                                                                                                        "subject",
                                                                                                                        "operation",
                                                                                                                        "param_bindings"
                                                                                                                  ]
                                                                                                            }
                                                                                                      },
                                                                                                      "else_path": {
                                                                                                            "type": "array",
                                                                                                            "items": {
                                                                                                                  "type": "object",
                                                                                                                  "properties": {
                                                                                                                        "id": {
                                                                                                                              "type": "string"
                                                                                                                        },
                                                                                                                        "if_else": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "conditions": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "else_path": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "then_path": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "then_path",
                                                                                                                                    "else_path"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "level": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "ack_mode": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "all",
                                                                                                                                                "first"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "round_robin_config": {
                                                                                                                                          "type": "object",
                                                                                                                                          "additionalProperties": true
                                                                                                                                    },
                                                                                                                                    "targets": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "time_to_ack_interval_condition": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "active",
                                                                                                                                                "inactive"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "time_to_ack_seconds": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "time_to_ack_weekday_interval_config_id": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "targets"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "notify_channel": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "targets": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "time_to_ack_interval_condition": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "active",
                                                                                                                                                "inactive"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "time_to_ack_seconds": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "time_to_ack_weekday_interval_config_id": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "targets"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "repeat": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "repeat_times": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "to_node": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "to_node",
                                                                                                                                    "repeat_times"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "type": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "if_else",
                                                                                                                                    "repeat",
                                                                                                                                    "level",
                                                                                                                                    "notify_channel"
                                                                                                                              ]
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "required": [
                                                                                                                        "id",
                                                                                                                        "type"
                                                                                                                  ]
                                                                                                            }
                                                                                                      },
                                                                                                      "then_path": {
                                                                                                            "type": "array",
                                                                                                            "items": {
                                                                                                                  "type": "object",
                                                                                                                  "properties": {
                                                                                                                        "id": {
                                                                                                                              "type": "string"
                                                                                                                        },
                                                                                                                        "if_else": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "conditions": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "else_path": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "then_path": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "then_path",
                                                                                                                                    "else_path"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "level": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "ack_mode": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "all",
                                                                                                                                                "first"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "round_robin_config": {
                                                                                                                                          "type": "object",
                                                                                                                                          "additionalProperties": true
                                                                                                                                    },
                                                                                                                                    "targets": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "time_to_ack_interval_condition": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "active",
                                                                                                                                                "inactive"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "time_to_ack_seconds": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "time_to_ack_weekday_interval_config_id": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "targets"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "notify_channel": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "targets": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "time_to_ack_interval_condition": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "active",
                                                                                                                                                "inactive"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "time_to_ack_seconds": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "time_to_ack_weekday_interval_config_id": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "targets"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "repeat": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "repeat_times": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "to_node": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "to_node",
                                                                                                                                    "repeat_times"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "type": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "if_else",
                                                                                                                                    "repeat",
                                                                                                                                    "level",
                                                                                                                                    "notify_channel"
                                                                                                                              ]
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "required": [
                                                                                                                        "id",
                                                                                                                        "type"
                                                                                                                  ]
                                                                                                            }
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "then_path",
                                                                                                      "else_path"
                                                                                                ]
                                                                                          },
                                                                                          "level": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "ack_mode": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "all",
                                                                                                                  "first"
                                                                                                            ]
                                                                                                      },
                                                                                                      "round_robin_config": {
                                                                                                            "type": "object",
                                                                                                            "properties": {
                                                                                                                  "enabled": {
                                                                                                                        "type": "boolean"
                                                                                                                  },
                                                                                                                  "rotate_after_seconds": {
                                                                                                                        "type": "number"
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "enabled"
                                                                                                            ]
                                                                                                      },
                                                                                                      "targets": {
                                                                                                            "type": "array",
                                                                                                            "items": {
                                                                                                                  "type": "object",
                                                                                                                  "properties": {
                                                                                                                        "id": {
                                                                                                                              "type": "string"
                                                                                                                        },
                                                                                                                        "schedule_mode": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "currently_on_call",
                                                                                                                                    "all_users_for_rota",
                                                                                                                                    "all_users",
                                                                                                                                    ""
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "type": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "schedule",
                                                                                                                                    "user",
                                                                                                                                    "slack_channel",
                                                                                                                                    "msteams_channel"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "urgency": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "high",
                                                                                                                                    "low"
                                                                                                                              ]
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "required": [
                                                                                                                        "type",
                                                                                                                        "id",
                                                                                                                        "urgency"
                                                                                                                  ]
                                                                                                            }
                                                                                                      },
                                                                                                      "time_to_ack_interval_condition": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "active",
                                                                                                                  "inactive"
                                                                                                            ]
                                                                                                      },
                                                                                                      "time_to_ack_seconds": {
                                                                                                            "type": "number"
                                                                                                      },
                                                                                                      "time_to_ack_weekday_interval_config_id": {
                                                                                                            "type": "string"
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "targets"
                                                                                                ]
                                                                                          },
                                                                                          "notify_channel": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "targets": {
                                                                                                            "type": "array",
                                                                                                            "items": {
                                                                                                                  "type": "object",
                                                                                                                  "properties": {
                                                                                                                        "id": {
                                                                                                                              "type": "string"
                                                                                                                        },
                                                                                                                        "schedule_mode": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "currently_on_call",
                                                                                                                                    "all_users_for_rota",
                                                                                                                                    "all_users",
                                                                                                                                    ""
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "type": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "schedule",
                                                                                                                                    "user",
                                                                                                                                    "slack_channel",
                                                                                                                                    "msteams_channel"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "urgency": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "high",
                                                                                                                                    "low"
                                                                                                                              ]
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "required": [
                                                                                                                        "type",
                                                                                                                        "id",
                                                                                                                        "urgency"
                                                                                                                  ]
                                                                                                            }
                                                                                                      },
                                                                                                      "time_to_ack_interval_condition": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "active",
                                                                                                                  "inactive"
                                                                                                            ]
                                                                                                      },
                                                                                                      "time_to_ack_seconds": {
                                                                                                            "type": "number"
                                                                                                      },
                                                                                                      "time_to_ack_weekday_interval_config_id": {
                                                                                                            "type": "string"
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "targets"
                                                                                                ]
                                                                                          },
                                                                                          "repeat": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "repeat_times": {
                                                                                                            "type": "number"
                                                                                                      },
                                                                                                      "to_node": {
                                                                                                            "type": "string"
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "to_node",
                                                                                                      "repeat_times"
                                                                                                ]
                                                                                          },
                                                                                          "type": {
                                                                                                "type": "string",
                                                                                                "enum": [
                                                                                                      "if_else",
                                                                                                      "repeat",
                                                                                                      "level",
                                                                                                      "notify_channel"
                                                                                                ]
                                                                                          }
                                                                                    },
                                                                                    "required": [
                                                                                          "id",
                                                                                          "type"
                                                                                    ]
                                                                              }
                                                                        },
                                                                        "then_path": {
                                                                              "type": "array",
                                                                              "items": {
                                                                                    "type": "object",
                                                                                    "properties": {
                                                                                          "id": {
                                                                                                "type": "string"
                                                                                          },
                                                                                          "if_else": {
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
                                                                                                                              "type": "string"
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "required": [
                                                                                                                        "subject",
                                                                                                                        "operation",
                                                                                                                        "param_bindings"
                                                                                                                  ]
                                                                                                            }
                                                                                                      },
                                                                                                      "else_path": {
                                                                                                            "type": "array",
                                                                                                            "items": {
                                                                                                                  "type": "object",
                                                                                                                  "properties": {
                                                                                                                        "id": {
                                                                                                                              "type": "string"
                                                                                                                        },
                                                                                                                        "if_else": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "conditions": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "else_path": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "then_path": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "then_path",
                                                                                                                                    "else_path"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "level": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "ack_mode": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "all",
                                                                                                                                                "first"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "round_robin_config": {
                                                                                                                                          "type": "object",
                                                                                                                                          "additionalProperties": true
                                                                                                                                    },
                                                                                                                                    "targets": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "time_to_ack_interval_condition": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "active",
                                                                                                                                                "inactive"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "time_to_ack_seconds": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "time_to_ack_weekday_interval_config_id": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "targets"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "notify_channel": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "targets": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "time_to_ack_interval_condition": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "active",
                                                                                                                                                "inactive"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "time_to_ack_seconds": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "time_to_ack_weekday_interval_config_id": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "targets"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "repeat": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "repeat_times": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "to_node": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "to_node",
                                                                                                                                    "repeat_times"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "type": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "if_else",
                                                                                                                                    "repeat",
                                                                                                                                    "level",
                                                                                                                                    "notify_channel"
                                                                                                                              ]
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "required": [
                                                                                                                        "id",
                                                                                                                        "type"
                                                                                                                  ]
                                                                                                            }
                                                                                                      },
                                                                                                      "then_path": {
                                                                                                            "type": "array",
                                                                                                            "items": {
                                                                                                                  "type": "object",
                                                                                                                  "properties": {
                                                                                                                        "id": {
                                                                                                                              "type": "string"
                                                                                                                        },
                                                                                                                        "if_else": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "conditions": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "else_path": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "then_path": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "then_path",
                                                                                                                                    "else_path"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "level": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "ack_mode": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "all",
                                                                                                                                                "first"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "round_robin_config": {
                                                                                                                                          "type": "object",
                                                                                                                                          "additionalProperties": true
                                                                                                                                    },
                                                                                                                                    "targets": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "time_to_ack_interval_condition": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "active",
                                                                                                                                                "inactive"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "time_to_ack_seconds": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "time_to_ack_weekday_interval_config_id": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "targets"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "notify_channel": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "targets": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "time_to_ack_interval_condition": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "active",
                                                                                                                                                "inactive"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "time_to_ack_seconds": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "time_to_ack_weekday_interval_config_id": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "targets"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "repeat": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "repeat_times": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "to_node": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "to_node",
                                                                                                                                    "repeat_times"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "type": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "if_else",
                                                                                                                                    "repeat",
                                                                                                                                    "level",
                                                                                                                                    "notify_channel"
                                                                                                                              ]
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "required": [
                                                                                                                        "id",
                                                                                                                        "type"
                                                                                                                  ]
                                                                                                            }
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "then_path",
                                                                                                      "else_path"
                                                                                                ]
                                                                                          },
                                                                                          "level": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "ack_mode": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "all",
                                                                                                                  "first"
                                                                                                            ]
                                                                                                      },
                                                                                                      "round_robin_config": {
                                                                                                            "type": "object",
                                                                                                            "properties": {
                                                                                                                  "enabled": {
                                                                                                                        "type": "boolean"
                                                                                                                  },
                                                                                                                  "rotate_after_seconds": {
                                                                                                                        "type": "number"
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "enabled"
                                                                                                            ]
                                                                                                      },
                                                                                                      "targets": {
                                                                                                            "type": "array",
                                                                                                            "items": {
                                                                                                                  "type": "object",
                                                                                                                  "properties": {
                                                                                                                        "id": {
                                                                                                                              "type": "string"
                                                                                                                        },
                                                                                                                        "schedule_mode": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "currently_on_call",
                                                                                                                                    "all_users_for_rota",
                                                                                                                                    "all_users",
                                                                                                                                    ""
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "type": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "schedule",
                                                                                                                                    "user",
                                                                                                                                    "slack_channel",
                                                                                                                                    "msteams_channel"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "urgency": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "high",
                                                                                                                                    "low"
                                                                                                                              ]
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "required": [
                                                                                                                        "type",
                                                                                                                        "id",
                                                                                                                        "urgency"
                                                                                                                  ]
                                                                                                            }
                                                                                                      },
                                                                                                      "time_to_ack_interval_condition": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "active",
                                                                                                                  "inactive"
                                                                                                            ]
                                                                                                      },
                                                                                                      "time_to_ack_seconds": {
                                                                                                            "type": "number"
                                                                                                      },
                                                                                                      "time_to_ack_weekday_interval_config_id": {
                                                                                                            "type": "string"
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "targets"
                                                                                                ]
                                                                                          },
                                                                                          "notify_channel": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "targets": {
                                                                                                            "type": "array",
                                                                                                            "items": {
                                                                                                                  "type": "object",
                                                                                                                  "properties": {
                                                                                                                        "id": {
                                                                                                                              "type": "string"
                                                                                                                        },
                                                                                                                        "schedule_mode": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "currently_on_call",
                                                                                                                                    "all_users_for_rota",
                                                                                                                                    "all_users",
                                                                                                                                    ""
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "type": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "schedule",
                                                                                                                                    "user",
                                                                                                                                    "slack_channel",
                                                                                                                                    "msteams_channel"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "urgency": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "high",
                                                                                                                                    "low"
                                                                                                                              ]
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "required": [
                                                                                                                        "type",
                                                                                                                        "id",
                                                                                                                        "urgency"
                                                                                                                  ]
                                                                                                            }
                                                                                                      },
                                                                                                      "time_to_ack_interval_condition": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "active",
                                                                                                                  "inactive"
                                                                                                            ]
                                                                                                      },
                                                                                                      "time_to_ack_seconds": {
                                                                                                            "type": "number"
                                                                                                      },
                                                                                                      "time_to_ack_weekday_interval_config_id": {
                                                                                                            "type": "string"
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "targets"
                                                                                                ]
                                                                                          },
                                                                                          "repeat": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "repeat_times": {
                                                                                                            "type": "number"
                                                                                                      },
                                                                                                      "to_node": {
                                                                                                            "type": "string"
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "to_node",
                                                                                                      "repeat_times"
                                                                                                ]
                                                                                          },
                                                                                          "type": {
                                                                                                "type": "string",
                                                                                                "enum": [
                                                                                                      "if_else",
                                                                                                      "repeat",
                                                                                                      "level",
                                                                                                      "notify_channel"
                                                                                                ]
                                                                                          }
                                                                                    },
                                                                                    "required": [
                                                                                          "id",
                                                                                          "type"
                                                                                    ]
                                                                              }
                                                                        }
                                                                  },
                                                                  "required": [
                                                                        "then_path",
                                                                        "else_path"
                                                                  ]
                                                            },
                                                            "level": {
                                                                  "type": "object",
                                                                  "properties": {
                                                                        "ack_mode": {
                                                                              "type": "string",
                                                                              "enum": [
                                                                                    "all",
                                                                                    "first"
                                                                              ]
                                                                        },
                                                                        "round_robin_config": {
                                                                              "type": "object",
                                                                              "properties": {
                                                                                    "enabled": {
                                                                                          "type": "boolean"
                                                                                    },
                                                                                    "rotate_after_seconds": {
                                                                                          "type": "number"
                                                                                    }
                                                                              },
                                                                              "required": [
                                                                                    "enabled"
                                                                              ]
                                                                        },
                                                                        "targets": {
                                                                              "type": "array",
                                                                              "items": {
                                                                                    "type": "object",
                                                                                    "properties": {
                                                                                          "id": {
                                                                                                "type": "string"
                                                                                          },
                                                                                          "schedule_mode": {
                                                                                                "type": "string",
                                                                                                "enum": [
                                                                                                      "currently_on_call",
                                                                                                      "all_users_for_rota",
                                                                                                      "all_users",
                                                                                                      ""
                                                                                                ]
                                                                                          },
                                                                                          "type": {
                                                                                                "type": "string",
                                                                                                "enum": [
                                                                                                      "schedule",
                                                                                                      "user",
                                                                                                      "slack_channel",
                                                                                                      "msteams_channel"
                                                                                                ]
                                                                                          },
                                                                                          "urgency": {
                                                                                                "type": "string",
                                                                                                "enum": [
                                                                                                      "high",
                                                                                                      "low"
                                                                                                ]
                                                                                          }
                                                                                    },
                                                                                    "required": [
                                                                                          "type",
                                                                                          "id",
                                                                                          "urgency"
                                                                                    ]
                                                                              }
                                                                        },
                                                                        "time_to_ack_interval_condition": {
                                                                              "type": "string",
                                                                              "enum": [
                                                                                    "active",
                                                                                    "inactive"
                                                                              ]
                                                                        },
                                                                        "time_to_ack_seconds": {
                                                                              "type": "number"
                                                                        },
                                                                        "time_to_ack_weekday_interval_config_id": {
                                                                              "type": "string"
                                                                        }
                                                                  },
                                                                  "required": [
                                                                        "targets"
                                                                  ]
                                                            },
                                                            "notify_channel": {
                                                                  "type": "object",
                                                                  "properties": {
                                                                        "targets": {
                                                                              "type": "array",
                                                                              "items": {
                                                                                    "type": "object",
                                                                                    "properties": {
                                                                                          "id": {
                                                                                                "type": "string"
                                                                                          },
                                                                                          "schedule_mode": {
                                                                                                "type": "string",
                                                                                                "enum": [
                                                                                                      "currently_on_call",
                                                                                                      "all_users_for_rota",
                                                                                                      "all_users",
                                                                                                      ""
                                                                                                ]
                                                                                          },
                                                                                          "type": {
                                                                                                "type": "string",
                                                                                                "enum": [
                                                                                                      "schedule",
                                                                                                      "user",
                                                                                                      "slack_channel",
                                                                                                      "msteams_channel"
                                                                                                ]
                                                                                          },
                                                                                          "urgency": {
                                                                                                "type": "string",
                                                                                                "enum": [
                                                                                                      "high",
                                                                                                      "low"
                                                                                                ]
                                                                                          }
                                                                                    },
                                                                                    "required": [
                                                                                          "type",
                                                                                          "id",
                                                                                          "urgency"
                                                                                    ]
                                                                              }
                                                                        },
                                                                        "time_to_ack_interval_condition": {
                                                                              "type": "string",
                                                                              "enum": [
                                                                                    "active",
                                                                                    "inactive"
                                                                              ]
                                                                        },
                                                                        "time_to_ack_seconds": {
                                                                              "type": "number"
                                                                        },
                                                                        "time_to_ack_weekday_interval_config_id": {
                                                                              "type": "string"
                                                                        }
                                                                  },
                                                                  "required": [
                                                                        "targets"
                                                                  ]
                                                            },
                                                            "repeat": {
                                                                  "type": "object",
                                                                  "properties": {
                                                                        "repeat_times": {
                                                                              "type": "number"
                                                                        },
                                                                        "to_node": {
                                                                              "type": "string"
                                                                        }
                                                                  },
                                                                  "required": [
                                                                        "to_node",
                                                                        "repeat_times"
                                                                  ]
                                                            },
                                                            "type": {
                                                                  "type": "string",
                                                                  "enum": [
                                                                        "if_else",
                                                                        "repeat",
                                                                        "level",
                                                                        "notify_channel"
                                                                  ]
                                                            }
                                                      },
                                                      "required": [
                                                            "id",
                                                            "type"
                                                      ]
                                                }
                                          },
                                          "then_path": {
                                                "type": "array",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "id": {
                                                                  "type": "string"
                                                            },
                                                            "if_else": {
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
                                                                        },
                                                                        "else_path": {
                                                                              "type": "array",
                                                                              "items": {
                                                                                    "type": "object",
                                                                                    "properties": {
                                                                                          "id": {
                                                                                                "type": "string"
                                                                                          },
                                                                                          "if_else": {
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
                                                                                                                              "type": "string"
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "required": [
                                                                                                                        "subject",
                                                                                                                        "operation",
                                                                                                                        "param_bindings"
                                                                                                                  ]
                                                                                                            }
                                                                                                      },
                                                                                                      "else_path": {
                                                                                                            "type": "array",
                                                                                                            "items": {
                                                                                                                  "type": "object",
                                                                                                                  "properties": {
                                                                                                                        "id": {
                                                                                                                              "type": "string"
                                                                                                                        },
                                                                                                                        "if_else": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "conditions": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "else_path": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "then_path": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "then_path",
                                                                                                                                    "else_path"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "level": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "ack_mode": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "all",
                                                                                                                                                "first"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "round_robin_config": {
                                                                                                                                          "type": "object",
                                                                                                                                          "additionalProperties": true
                                                                                                                                    },
                                                                                                                                    "targets": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "time_to_ack_interval_condition": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "active",
                                                                                                                                                "inactive"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "time_to_ack_seconds": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "time_to_ack_weekday_interval_config_id": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "targets"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "notify_channel": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "targets": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "time_to_ack_interval_condition": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "active",
                                                                                                                                                "inactive"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "time_to_ack_seconds": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "time_to_ack_weekday_interval_config_id": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "targets"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "repeat": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "repeat_times": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "to_node": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "to_node",
                                                                                                                                    "repeat_times"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "type": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "if_else",
                                                                                                                                    "repeat",
                                                                                                                                    "level",
                                                                                                                                    "notify_channel"
                                                                                                                              ]
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "required": [
                                                                                                                        "id",
                                                                                                                        "type"
                                                                                                                  ]
                                                                                                            }
                                                                                                      },
                                                                                                      "then_path": {
                                                                                                            "type": "array",
                                                                                                            "items": {
                                                                                                                  "type": "object",
                                                                                                                  "properties": {
                                                                                                                        "id": {
                                                                                                                              "type": "string"
                                                                                                                        },
                                                                                                                        "if_else": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "conditions": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "else_path": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "then_path": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "then_path",
                                                                                                                                    "else_path"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "level": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "ack_mode": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "all",
                                                                                                                                                "first"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "round_robin_config": {
                                                                                                                                          "type": "object",
                                                                                                                                          "additionalProperties": true
                                                                                                                                    },
                                                                                                                                    "targets": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "time_to_ack_interval_condition": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "active",
                                                                                                                                                "inactive"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "time_to_ack_seconds": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "time_to_ack_weekday_interval_config_id": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "targets"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "notify_channel": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "targets": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "time_to_ack_interval_condition": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "active",
                                                                                                                                                "inactive"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "time_to_ack_seconds": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "time_to_ack_weekday_interval_config_id": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "targets"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "repeat": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "repeat_times": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "to_node": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "to_node",
                                                                                                                                    "repeat_times"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "type": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "if_else",
                                                                                                                                    "repeat",
                                                                                                                                    "level",
                                                                                                                                    "notify_channel"
                                                                                                                              ]
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "required": [
                                                                                                                        "id",
                                                                                                                        "type"
                                                                                                                  ]
                                                                                                            }
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "then_path",
                                                                                                      "else_path"
                                                                                                ]
                                                                                          },
                                                                                          "level": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "ack_mode": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "all",
                                                                                                                  "first"
                                                                                                            ]
                                                                                                      },
                                                                                                      "round_robin_config": {
                                                                                                            "type": "object",
                                                                                                            "properties": {
                                                                                                                  "enabled": {
                                                                                                                        "type": "boolean"
                                                                                                                  },
                                                                                                                  "rotate_after_seconds": {
                                                                                                                        "type": "number"
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "enabled"
                                                                                                            ]
                                                                                                      },
                                                                                                      "targets": {
                                                                                                            "type": "array",
                                                                                                            "items": {
                                                                                                                  "type": "object",
                                                                                                                  "properties": {
                                                                                                                        "id": {
                                                                                                                              "type": "string"
                                                                                                                        },
                                                                                                                        "schedule_mode": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "currently_on_call",
                                                                                                                                    "all_users_for_rota",
                                                                                                                                    "all_users",
                                                                                                                                    ""
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "type": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "schedule",
                                                                                                                                    "user",
                                                                                                                                    "slack_channel",
                                                                                                                                    "msteams_channel"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "urgency": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "high",
                                                                                                                                    "low"
                                                                                                                              ]
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "required": [
                                                                                                                        "type",
                                                                                                                        "id",
                                                                                                                        "urgency"
                                                                                                                  ]
                                                                                                            }
                                                                                                      },
                                                                                                      "time_to_ack_interval_condition": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "active",
                                                                                                                  "inactive"
                                                                                                            ]
                                                                                                      },
                                                                                                      "time_to_ack_seconds": {
                                                                                                            "type": "number"
                                                                                                      },
                                                                                                      "time_to_ack_weekday_interval_config_id": {
                                                                                                            "type": "string"
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "targets"
                                                                                                ]
                                                                                          },
                                                                                          "notify_channel": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "targets": {
                                                                                                            "type": "array",
                                                                                                            "items": {
                                                                                                                  "type": "object",
                                                                                                                  "properties": {
                                                                                                                        "id": {
                                                                                                                              "type": "string"
                                                                                                                        },
                                                                                                                        "schedule_mode": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "currently_on_call",
                                                                                                                                    "all_users_for_rota",
                                                                                                                                    "all_users",
                                                                                                                                    ""
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "type": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "schedule",
                                                                                                                                    "user",
                                                                                                                                    "slack_channel",
                                                                                                                                    "msteams_channel"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "urgency": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "high",
                                                                                                                                    "low"
                                                                                                                              ]
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "required": [
                                                                                                                        "type",
                                                                                                                        "id",
                                                                                                                        "urgency"
                                                                                                                  ]
                                                                                                            }
                                                                                                      },
                                                                                                      "time_to_ack_interval_condition": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "active",
                                                                                                                  "inactive"
                                                                                                            ]
                                                                                                      },
                                                                                                      "time_to_ack_seconds": {
                                                                                                            "type": "number"
                                                                                                      },
                                                                                                      "time_to_ack_weekday_interval_config_id": {
                                                                                                            "type": "string"
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "targets"
                                                                                                ]
                                                                                          },
                                                                                          "repeat": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "repeat_times": {
                                                                                                            "type": "number"
                                                                                                      },
                                                                                                      "to_node": {
                                                                                                            "type": "string"
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "to_node",
                                                                                                      "repeat_times"
                                                                                                ]
                                                                                          },
                                                                                          "type": {
                                                                                                "type": "string",
                                                                                                "enum": [
                                                                                                      "if_else",
                                                                                                      "repeat",
                                                                                                      "level",
                                                                                                      "notify_channel"
                                                                                                ]
                                                                                          }
                                                                                    },
                                                                                    "required": [
                                                                                          "id",
                                                                                          "type"
                                                                                    ]
                                                                              }
                                                                        },
                                                                        "then_path": {
                                                                              "type": "array",
                                                                              "items": {
                                                                                    "type": "object",
                                                                                    "properties": {
                                                                                          "id": {
                                                                                                "type": "string"
                                                                                          },
                                                                                          "if_else": {
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
                                                                                                                              "type": "string"
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "required": [
                                                                                                                        "subject",
                                                                                                                        "operation",
                                                                                                                        "param_bindings"
                                                                                                                  ]
                                                                                                            }
                                                                                                      },
                                                                                                      "else_path": {
                                                                                                            "type": "array",
                                                                                                            "items": {
                                                                                                                  "type": "object",
                                                                                                                  "properties": {
                                                                                                                        "id": {
                                                                                                                              "type": "string"
                                                                                                                        },
                                                                                                                        "if_else": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "conditions": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "else_path": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "then_path": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "then_path",
                                                                                                                                    "else_path"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "level": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "ack_mode": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "all",
                                                                                                                                                "first"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "round_robin_config": {
                                                                                                                                          "type": "object",
                                                                                                                                          "additionalProperties": true
                                                                                                                                    },
                                                                                                                                    "targets": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "time_to_ack_interval_condition": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "active",
                                                                                                                                                "inactive"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "time_to_ack_seconds": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "time_to_ack_weekday_interval_config_id": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "targets"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "notify_channel": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "targets": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "time_to_ack_interval_condition": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "active",
                                                                                                                                                "inactive"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "time_to_ack_seconds": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "time_to_ack_weekday_interval_config_id": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "targets"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "repeat": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "repeat_times": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "to_node": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "to_node",
                                                                                                                                    "repeat_times"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "type": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "if_else",
                                                                                                                                    "repeat",
                                                                                                                                    "level",
                                                                                                                                    "notify_channel"
                                                                                                                              ]
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "required": [
                                                                                                                        "id",
                                                                                                                        "type"
                                                                                                                  ]
                                                                                                            }
                                                                                                      },
                                                                                                      "then_path": {
                                                                                                            "type": "array",
                                                                                                            "items": {
                                                                                                                  "type": "object",
                                                                                                                  "properties": {
                                                                                                                        "id": {
                                                                                                                              "type": "string"
                                                                                                                        },
                                                                                                                        "if_else": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "conditions": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "else_path": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "then_path": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "then_path",
                                                                                                                                    "else_path"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "level": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "ack_mode": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "all",
                                                                                                                                                "first"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "round_robin_config": {
                                                                                                                                          "type": "object",
                                                                                                                                          "additionalProperties": true
                                                                                                                                    },
                                                                                                                                    "targets": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "time_to_ack_interval_condition": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "active",
                                                                                                                                                "inactive"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "time_to_ack_seconds": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "time_to_ack_weekday_interval_config_id": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "targets"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "notify_channel": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "targets": {
                                                                                                                                          "type": "array",
                                                                                                                                          "items": {
                                                                                                                                                "type": "object",
                                                                                                                                                "additionalProperties": true
                                                                                                                                          }
                                                                                                                                    },
                                                                                                                                    "time_to_ack_interval_condition": {
                                                                                                                                          "type": "string",
                                                                                                                                          "enum": [
                                                                                                                                                "active",
                                                                                                                                                "inactive"
                                                                                                                                          ]
                                                                                                                                    },
                                                                                                                                    "time_to_ack_seconds": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "time_to_ack_weekday_interval_config_id": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "targets"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "repeat": {
                                                                                                                              "type": "object",
                                                                                                                              "properties": {
                                                                                                                                    "repeat_times": {
                                                                                                                                          "type": "number"
                                                                                                                                    },
                                                                                                                                    "to_node": {
                                                                                                                                          "type": "string"
                                                                                                                                    }
                                                                                                                              },
                                                                                                                              "required": [
                                                                                                                                    "to_node",
                                                                                                                                    "repeat_times"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "type": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "if_else",
                                                                                                                                    "repeat",
                                                                                                                                    "level",
                                                                                                                                    "notify_channel"
                                                                                                                              ]
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "required": [
                                                                                                                        "id",
                                                                                                                        "type"
                                                                                                                  ]
                                                                                                            }
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "then_path",
                                                                                                      "else_path"
                                                                                                ]
                                                                                          },
                                                                                          "level": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "ack_mode": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "all",
                                                                                                                  "first"
                                                                                                            ]
                                                                                                      },
                                                                                                      "round_robin_config": {
                                                                                                            "type": "object",
                                                                                                            "properties": {
                                                                                                                  "enabled": {
                                                                                                                        "type": "boolean"
                                                                                                                  },
                                                                                                                  "rotate_after_seconds": {
                                                                                                                        "type": "number"
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "enabled"
                                                                                                            ]
                                                                                                      },
                                                                                                      "targets": {
                                                                                                            "type": "array",
                                                                                                            "items": {
                                                                                                                  "type": "object",
                                                                                                                  "properties": {
                                                                                                                        "id": {
                                                                                                                              "type": "string"
                                                                                                                        },
                                                                                                                        "schedule_mode": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "currently_on_call",
                                                                                                                                    "all_users_for_rota",
                                                                                                                                    "all_users",
                                                                                                                                    ""
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "type": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "schedule",
                                                                                                                                    "user",
                                                                                                                                    "slack_channel",
                                                                                                                                    "msteams_channel"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "urgency": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "high",
                                                                                                                                    "low"
                                                                                                                              ]
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "required": [
                                                                                                                        "type",
                                                                                                                        "id",
                                                                                                                        "urgency"
                                                                                                                  ]
                                                                                                            }
                                                                                                      },
                                                                                                      "time_to_ack_interval_condition": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "active",
                                                                                                                  "inactive"
                                                                                                            ]
                                                                                                      },
                                                                                                      "time_to_ack_seconds": {
                                                                                                            "type": "number"
                                                                                                      },
                                                                                                      "time_to_ack_weekday_interval_config_id": {
                                                                                                            "type": "string"
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "targets"
                                                                                                ]
                                                                                          },
                                                                                          "notify_channel": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "targets": {
                                                                                                            "type": "array",
                                                                                                            "items": {
                                                                                                                  "type": "object",
                                                                                                                  "properties": {
                                                                                                                        "id": {
                                                                                                                              "type": "string"
                                                                                                                        },
                                                                                                                        "schedule_mode": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "currently_on_call",
                                                                                                                                    "all_users_for_rota",
                                                                                                                                    "all_users",
                                                                                                                                    ""
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "type": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "schedule",
                                                                                                                                    "user",
                                                                                                                                    "slack_channel",
                                                                                                                                    "msteams_channel"
                                                                                                                              ]
                                                                                                                        },
                                                                                                                        "urgency": {
                                                                                                                              "type": "string",
                                                                                                                              "enum": [
                                                                                                                                    "high",
                                                                                                                                    "low"
                                                                                                                              ]
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "required": [
                                                                                                                        "type",
                                                                                                                        "id",
                                                                                                                        "urgency"
                                                                                                                  ]
                                                                                                            }
                                                                                                      },
                                                                                                      "time_to_ack_interval_condition": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "active",
                                                                                                                  "inactive"
                                                                                                            ]
                                                                                                      },
                                                                                                      "time_to_ack_seconds": {
                                                                                                            "type": "number"
                                                                                                      },
                                                                                                      "time_to_ack_weekday_interval_config_id": {
                                                                                                            "type": "string"
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "targets"
                                                                                                ]
                                                                                          },
                                                                                          "repeat": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "repeat_times": {
                                                                                                            "type": "number"
                                                                                                      },
                                                                                                      "to_node": {
                                                                                                            "type": "string"
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "to_node",
                                                                                                      "repeat_times"
                                                                                                ]
                                                                                          },
                                                                                          "type": {
                                                                                                "type": "string",
                                                                                                "enum": [
                                                                                                      "if_else",
                                                                                                      "repeat",
                                                                                                      "level",
                                                                                                      "notify_channel"
                                                                                                ]
                                                                                          }
                                                                                    },
                                                                                    "required": [
                                                                                          "id",
                                                                                          "type"
                                                                                    ]
                                                                              }
                                                                        }
                                                                  },
                                                                  "required": [
                                                                        "then_path",
                                                                        "else_path"
                                                                  ]
                                                            },
                                                            "level": {
                                                                  "type": "object",
                                                                  "properties": {
                                                                        "ack_mode": {
                                                                              "type": "string",
                                                                              "enum": [
                                                                                    "all",
                                                                                    "first"
                                                                              ]
                                                                        },
                                                                        "round_robin_config": {
                                                                              "type": "object",
                                                                              "properties": {
                                                                                    "enabled": {
                                                                                          "type": "boolean"
                                                                                    },
                                                                                    "rotate_after_seconds": {
                                                                                          "type": "number"
                                                                                    }
                                                                              },
                                                                              "required": [
                                                                                    "enabled"
                                                                              ]
                                                                        },
                                                                        "targets": {
                                                                              "type": "array",
                                                                              "items": {
                                                                                    "type": "object",
                                                                                    "properties": {
                                                                                          "id": {
                                                                                                "type": "string"
                                                                                          },
                                                                                          "schedule_mode": {
                                                                                                "type": "string",
                                                                                                "enum": [
                                                                                                      "currently_on_call",
                                                                                                      "all_users_for_rota",
                                                                                                      "all_users",
                                                                                                      ""
                                                                                                ]
                                                                                          },
                                                                                          "type": {
                                                                                                "type": "string",
                                                                                                "enum": [
                                                                                                      "schedule",
                                                                                                      "user",
                                                                                                      "slack_channel",
                                                                                                      "msteams_channel"
                                                                                                ]
                                                                                          },
                                                                                          "urgency": {
                                                                                                "type": "string",
                                                                                                "enum": [
                                                                                                      "high",
                                                                                                      "low"
                                                                                                ]
                                                                                          }
                                                                                    },
                                                                                    "required": [
                                                                                          "type",
                                                                                          "id",
                                                                                          "urgency"
                                                                                    ]
                                                                              }
                                                                        },
                                                                        "time_to_ack_interval_condition": {
                                                                              "type": "string",
                                                                              "enum": [
                                                                                    "active",
                                                                                    "inactive"
                                                                              ]
                                                                        },
                                                                        "time_to_ack_seconds": {
                                                                              "type": "number"
                                                                        },
                                                                        "time_to_ack_weekday_interval_config_id": {
                                                                              "type": "string"
                                                                        }
                                                                  },
                                                                  "required": [
                                                                        "targets"
                                                                  ]
                                                            },
                                                            "notify_channel": {
                                                                  "type": "object",
                                                                  "properties": {
                                                                        "targets": {
                                                                              "type": "array",
                                                                              "items": {
                                                                                    "type": "object",
                                                                                    "properties": {
                                                                                          "id": {
                                                                                                "type": "string"
                                                                                          },
                                                                                          "schedule_mode": {
                                                                                                "type": "string",
                                                                                                "enum": [
                                                                                                      "currently_on_call",
                                                                                                      "all_users_for_rota",
                                                                                                      "all_users",
                                                                                                      ""
                                                                                                ]
                                                                                          },
                                                                                          "type": {
                                                                                                "type": "string",
                                                                                                "enum": [
                                                                                                      "schedule",
                                                                                                      "user",
                                                                                                      "slack_channel",
                                                                                                      "msteams_channel"
                                                                                                ]
                                                                                          },
                                                                                          "urgency": {
                                                                                                "type": "string",
                                                                                                "enum": [
                                                                                                      "high",
                                                                                                      "low"
                                                                                                ]
                                                                                          }
                                                                                    },
                                                                                    "required": [
                                                                                          "type",
                                                                                          "id",
                                                                                          "urgency"
                                                                                    ]
                                                                              }
                                                                        },
                                                                        "time_to_ack_interval_condition": {
                                                                              "type": "string",
                                                                              "enum": [
                                                                                    "active",
                                                                                    "inactive"
                                                                              ]
                                                                        },
                                                                        "time_to_ack_seconds": {
                                                                              "type": "number"
                                                                        },
                                                                        "time_to_ack_weekday_interval_config_id": {
                                                                              "type": "string"
                                                                        }
                                                                  },
                                                                  "required": [
                                                                        "targets"
                                                                  ]
                                                            },
                                                            "repeat": {
                                                                  "type": "object",
                                                                  "properties": {
                                                                        "repeat_times": {
                                                                              "type": "number"
                                                                        },
                                                                        "to_node": {
                                                                              "type": "string"
                                                                        }
                                                                  },
                                                                  "required": [
                                                                        "to_node",
                                                                        "repeat_times"
                                                                  ]
                                                            },
                                                            "type": {
                                                                  "type": "string",
                                                                  "enum": [
                                                                        "if_else",
                                                                        "repeat",
                                                                        "level",
                                                                        "notify_channel"
                                                                  ]
                                                            }
                                                      },
                                                      "required": [
                                                            "id",
                                                            "type"
                                                      ]
                                                }
                                          }
                                    },
                                    "required": [
                                          "then_path",
                                          "else_path"
                                    ]
                              },
                              "level": {
                                    "type": "object",
                                    "properties": {
                                          "ack_mode": {
                                                "type": "string",
                                                "enum": [
                                                      "all",
                                                      "first"
                                                ]
                                          },
                                          "round_robin_config": {
                                                "type": "object",
                                                "properties": {
                                                      "enabled": {
                                                            "type": "boolean"
                                                      },
                                                      "rotate_after_seconds": {
                                                            "type": "number"
                                                      }
                                                },
                                                "required": [
                                                      "enabled"
                                                ]
                                          },
                                          "targets": {
                                                "type": "array",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "id": {
                                                                  "type": "string"
                                                            },
                                                            "schedule_mode": {
                                                                  "type": "string",
                                                                  "enum": [
                                                                        "currently_on_call",
                                                                        "all_users_for_rota",
                                                                        "all_users",
                                                                        ""
                                                                  ]
                                                            },
                                                            "type": {
                                                                  "type": "string",
                                                                  "enum": [
                                                                        "schedule",
                                                                        "user",
                                                                        "slack_channel",
                                                                        "msteams_channel"
                                                                  ]
                                                            },
                                                            "urgency": {
                                                                  "type": "string",
                                                                  "enum": [
                                                                        "high",
                                                                        "low"
                                                                  ]
                                                            }
                                                      },
                                                      "required": [
                                                            "type",
                                                            "id",
                                                            "urgency"
                                                      ]
                                                }
                                          },
                                          "time_to_ack_interval_condition": {
                                                "type": "string",
                                                "enum": [
                                                      "active",
                                                      "inactive"
                                                ]
                                          },
                                          "time_to_ack_seconds": {
                                                "type": "number"
                                          },
                                          "time_to_ack_weekday_interval_config_id": {
                                                "type": "string"
                                          }
                                    },
                                    "required": [
                                          "targets"
                                    ]
                              },
                              "notify_channel": {
                                    "type": "object",
                                    "properties": {
                                          "targets": {
                                                "type": "array",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "id": {
                                                                  "type": "string"
                                                            },
                                                            "schedule_mode": {
                                                                  "type": "string",
                                                                  "enum": [
                                                                        "currently_on_call",
                                                                        "all_users_for_rota",
                                                                        "all_users",
                                                                        ""
                                                                  ]
                                                            },
                                                            "type": {
                                                                  "type": "string",
                                                                  "enum": [
                                                                        "schedule",
                                                                        "user",
                                                                        "slack_channel",
                                                                        "msteams_channel"
                                                                  ]
                                                            },
                                                            "urgency": {
                                                                  "type": "string",
                                                                  "enum": [
                                                                        "high",
                                                                        "low"
                                                                  ]
                                                            }
                                                      },
                                                      "required": [
                                                            "type",
                                                            "id",
                                                            "urgency"
                                                      ]
                                                }
                                          },
                                          "time_to_ack_interval_condition": {
                                                "type": "string",
                                                "enum": [
                                                      "active",
                                                      "inactive"
                                                ]
                                          },
                                          "time_to_ack_seconds": {
                                                "type": "number"
                                          },
                                          "time_to_ack_weekday_interval_config_id": {
                                                "type": "string"
                                          }
                                    },
                                    "required": [
                                          "targets"
                                    ]
                              },
                              "repeat": {
                                    "type": "object",
                                    "properties": {
                                          "repeat_times": {
                                                "type": "number"
                                          },
                                          "to_node": {
                                                "type": "string"
                                          }
                                    },
                                    "required": [
                                          "to_node",
                                          "repeat_times"
                                    ]
                              },
                              "type": {
                                    "type": "string",
                                    "enum": [
                                          "if_else",
                                          "repeat",
                                          "level",
                                          "notify_channel"
                                    ]
                              }
                        },
                        "required": [
                              "id",
                              "type"
                        ]
                  }
            },
            "required": false
      },
      "team_ids": {
            "name": "Team Ids",
            "description": "IDs of the teams that own this escalation path. This will automatically sync escalation paths with the right teams in Catalog. If you have an escalation paths attribute on your Teams, this attribute is required.",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "string"
                  }
            },
            "required": false
      },
      "working_hours": {
            "name": "Working Hours",
            "description": "The working hours for this escalation path.",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "id": {
                                    "type": "string"
                              },
                              "name": {
                                    "type": "string"
                              },
                              "timezone": {
                                    "type": "string"
                              },
                              "weekday_intervals": {
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
                              "timezone",
                              "weekday_intervals"
                        ]
                  }
            },
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/escalation_paths";
        const body: Record<string, any> = {};
        if (input.event.inputConfig.name !== undefined) {
          body.name = input.event.inputConfig.name;
        }
        if (input.event.inputConfig.path !== undefined) {
          body.path = input.event.inputConfig.path;
        }
        if (input.event.inputConfig.team_ids !== undefined) {
          body.team_ids = input.event.inputConfig.team_ids;
        }
        if (input.event.inputConfig.working_hours !== undefined) {
          body.working_hours = input.event.inputConfig.working_hours;
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
            "escalation_path": {
                  "type": "object",
                  "properties": {
                        "id": {
                              "type": "string"
                        },
                        "name": {
                              "type": "string"
                        },
                        "path": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "id": {
                                                "type": "string"
                                          },
                                          "if_else": {
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
                                                      },
                                                      "else_path": {
                                                            "type": "array",
                                                            "items": {
                                                                  "type": "object",
                                                                  "properties": {
                                                                        "id": {
                                                                              "type": "string"
                                                                        },
                                                                        "if_else": {
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
                                                                                    },
                                                                                    "else_path": {
                                                                                          "type": "array",
                                                                                          "items": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "id": {
                                                                                                            "type": "string"
                                                                                                      },
                                                                                                      "if_else": {
                                                                                                            "type": "object",
                                                                                                            "properties": {
                                                                                                                  "conditions": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "else_path": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "then_path": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "conditions",
                                                                                                                  "then_path",
                                                                                                                  "else_path"
                                                                                                            ]
                                                                                                      },
                                                                                                      "level": {
                                                                                                            "type": "object",
                                                                                                            "properties": {
                                                                                                                  "ack_mode": {
                                                                                                                        "type": "string",
                                                                                                                        "enum": [
                                                                                                                              "all",
                                                                                                                              "first"
                                                                                                                        ]
                                                                                                                  },
                                                                                                                  "round_robin_config": {
                                                                                                                        "type": "object",
                                                                                                                        "properties": {
                                                                                                                              "enabled": {
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
                                                                                                                              },
                                                                                                                              "rotate_after_seconds": {
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
                                                                                                                              }
                                                                                                                        },
                                                                                                                        "required": [
                                                                                                                              "enabled"
                                                                                                                        ]
                                                                                                                  },
                                                                                                                  "targets": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "time_to_ack_interval_condition": {
                                                                                                                        "type": "string",
                                                                                                                        "enum": [
                                                                                                                              "active",
                                                                                                                              "inactive"
                                                                                                                        ]
                                                                                                                  },
                                                                                                                  "time_to_ack_seconds": {
                                                                                                                        "type": "number"
                                                                                                                  },
                                                                                                                  "time_to_ack_weekday_interval_config_id": {
                                                                                                                        "type": "string"
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "targets"
                                                                                                            ]
                                                                                                      },
                                                                                                      "notify_channel": {
                                                                                                            "type": "object",
                                                                                                            "properties": {
                                                                                                                  "targets": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "time_to_ack_interval_condition": {
                                                                                                                        "type": "string",
                                                                                                                        "enum": [
                                                                                                                              "active",
                                                                                                                              "inactive"
                                                                                                                        ]
                                                                                                                  },
                                                                                                                  "time_to_ack_seconds": {
                                                                                                                        "type": "number"
                                                                                                                  },
                                                                                                                  "time_to_ack_weekday_interval_config_id": {
                                                                                                                        "type": "string"
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "targets"
                                                                                                            ]
                                                                                                      },
                                                                                                      "repeat": {
                                                                                                            "type": "object",
                                                                                                            "properties": {
                                                                                                                  "repeat_times": {
                                                                                                                        "type": "number"
                                                                                                                  },
                                                                                                                  "to_node": {
                                                                                                                        "type": "string"
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "to_node",
                                                                                                                  "repeat_times"
                                                                                                            ]
                                                                                                      },
                                                                                                      "type": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "if_else",
                                                                                                                  "repeat",
                                                                                                                  "level",
                                                                                                                  "notify_channel"
                                                                                                            ]
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "id",
                                                                                                      "type"
                                                                                                ]
                                                                                          }
                                                                                    },
                                                                                    "then_path": {
                                                                                          "type": "array",
                                                                                          "items": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "id": {
                                                                                                            "type": "string"
                                                                                                      },
                                                                                                      "if_else": {
                                                                                                            "type": "object",
                                                                                                            "properties": {
                                                                                                                  "conditions": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "else_path": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "then_path": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "conditions",
                                                                                                                  "then_path",
                                                                                                                  "else_path"
                                                                                                            ]
                                                                                                      },
                                                                                                      "level": {
                                                                                                            "type": "object",
                                                                                                            "properties": {
                                                                                                                  "ack_mode": {
                                                                                                                        "type": "string",
                                                                                                                        "enum": [
                                                                                                                              "all",
                                                                                                                              "first"
                                                                                                                        ]
                                                                                                                  },
                                                                                                                  "round_robin_config": {
                                                                                                                        "type": "object",
                                                                                                                        "properties": {
                                                                                                                              "enabled": {
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
                                                                                                                              },
                                                                                                                              "rotate_after_seconds": {
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
                                                                                                                              }
                                                                                                                        },
                                                                                                                        "required": [
                                                                                                                              "enabled"
                                                                                                                        ]
                                                                                                                  },
                                                                                                                  "targets": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "time_to_ack_interval_condition": {
                                                                                                                        "type": "string",
                                                                                                                        "enum": [
                                                                                                                              "active",
                                                                                                                              "inactive"
                                                                                                                        ]
                                                                                                                  },
                                                                                                                  "time_to_ack_seconds": {
                                                                                                                        "type": "number"
                                                                                                                  },
                                                                                                                  "time_to_ack_weekday_interval_config_id": {
                                                                                                                        "type": "string"
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "targets"
                                                                                                            ]
                                                                                                      },
                                                                                                      "notify_channel": {
                                                                                                            "type": "object",
                                                                                                            "properties": {
                                                                                                                  "targets": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "time_to_ack_interval_condition": {
                                                                                                                        "type": "string",
                                                                                                                        "enum": [
                                                                                                                              "active",
                                                                                                                              "inactive"
                                                                                                                        ]
                                                                                                                  },
                                                                                                                  "time_to_ack_seconds": {
                                                                                                                        "type": "number"
                                                                                                                  },
                                                                                                                  "time_to_ack_weekday_interval_config_id": {
                                                                                                                        "type": "string"
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "targets"
                                                                                                            ]
                                                                                                      },
                                                                                                      "repeat": {
                                                                                                            "type": "object",
                                                                                                            "properties": {
                                                                                                                  "repeat_times": {
                                                                                                                        "type": "number"
                                                                                                                  },
                                                                                                                  "to_node": {
                                                                                                                        "type": "string"
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "to_node",
                                                                                                                  "repeat_times"
                                                                                                            ]
                                                                                                      },
                                                                                                      "type": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "if_else",
                                                                                                                  "repeat",
                                                                                                                  "level",
                                                                                                                  "notify_channel"
                                                                                                            ]
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "id",
                                                                                                      "type"
                                                                                                ]
                                                                                          }
                                                                                    }
                                                                              },
                                                                              "required": [
                                                                                    "conditions",
                                                                                    "then_path",
                                                                                    "else_path"
                                                                              ]
                                                                        },
                                                                        "level": {
                                                                              "type": "object",
                                                                              "properties": {
                                                                                    "ack_mode": {
                                                                                          "type": "string",
                                                                                          "enum": [
                                                                                                "all",
                                                                                                "first"
                                                                                          ]
                                                                                    },
                                                                                    "round_robin_config": {
                                                                                          "type": "object",
                                                                                          "properties": {
                                                                                                "enabled": {
                                                                                                      "type": "boolean"
                                                                                                },
                                                                                                "rotate_after_seconds": {
                                                                                                      "type": "number"
                                                                                                }
                                                                                          },
                                                                                          "required": [
                                                                                                "enabled"
                                                                                          ]
                                                                                    },
                                                                                    "targets": {
                                                                                          "type": "array",
                                                                                          "items": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "id": {
                                                                                                            "type": "string"
                                                                                                      },
                                                                                                      "schedule_mode": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "currently_on_call",
                                                                                                                  "all_users_for_rota",
                                                                                                                  "all_users",
                                                                                                                  ""
                                                                                                            ]
                                                                                                      },
                                                                                                      "type": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "schedule",
                                                                                                                  "user",
                                                                                                                  "slack_channel",
                                                                                                                  "msteams_channel"
                                                                                                            ]
                                                                                                      },
                                                                                                      "urgency": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "high",
                                                                                                                  "low"
                                                                                                            ]
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "type",
                                                                                                      "id",
                                                                                                      "urgency"
                                                                                                ]
                                                                                          }
                                                                                    },
                                                                                    "time_to_ack_interval_condition": {
                                                                                          "type": "string",
                                                                                          "enum": [
                                                                                                "active",
                                                                                                "inactive"
                                                                                          ]
                                                                                    },
                                                                                    "time_to_ack_seconds": {
                                                                                          "type": "number"
                                                                                    },
                                                                                    "time_to_ack_weekday_interval_config_id": {
                                                                                          "type": "string"
                                                                                    }
                                                                              },
                                                                              "required": [
                                                                                    "targets"
                                                                              ]
                                                                        },
                                                                        "notify_channel": {
                                                                              "type": "object",
                                                                              "properties": {
                                                                                    "targets": {
                                                                                          "type": "array",
                                                                                          "items": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "id": {
                                                                                                            "type": "string"
                                                                                                      },
                                                                                                      "schedule_mode": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "currently_on_call",
                                                                                                                  "all_users_for_rota",
                                                                                                                  "all_users",
                                                                                                                  ""
                                                                                                            ]
                                                                                                      },
                                                                                                      "type": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "schedule",
                                                                                                                  "user",
                                                                                                                  "slack_channel",
                                                                                                                  "msteams_channel"
                                                                                                            ]
                                                                                                      },
                                                                                                      "urgency": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "high",
                                                                                                                  "low"
                                                                                                            ]
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "type",
                                                                                                      "id",
                                                                                                      "urgency"
                                                                                                ]
                                                                                          }
                                                                                    },
                                                                                    "time_to_ack_interval_condition": {
                                                                                          "type": "string",
                                                                                          "enum": [
                                                                                                "active",
                                                                                                "inactive"
                                                                                          ]
                                                                                    },
                                                                                    "time_to_ack_seconds": {
                                                                                          "type": "number"
                                                                                    },
                                                                                    "time_to_ack_weekday_interval_config_id": {
                                                                                          "type": "string"
                                                                                    }
                                                                              },
                                                                              "required": [
                                                                                    "targets"
                                                                              ]
                                                                        },
                                                                        "repeat": {
                                                                              "type": "object",
                                                                              "properties": {
                                                                                    "repeat_times": {
                                                                                          "type": "number"
                                                                                    },
                                                                                    "to_node": {
                                                                                          "type": "string"
                                                                                    }
                                                                              },
                                                                              "required": [
                                                                                    "to_node",
                                                                                    "repeat_times"
                                                                              ]
                                                                        },
                                                                        "type": {
                                                                              "type": "string",
                                                                              "enum": [
                                                                                    "if_else",
                                                                                    "repeat",
                                                                                    "level",
                                                                                    "notify_channel"
                                                                              ]
                                                                        }
                                                                  },
                                                                  "required": [
                                                                        "id",
                                                                        "type"
                                                                  ]
                                                            }
                                                      },
                                                      "then_path": {
                                                            "type": "array",
                                                            "items": {
                                                                  "type": "object",
                                                                  "properties": {
                                                                        "id": {
                                                                              "type": "string"
                                                                        },
                                                                        "if_else": {
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
                                                                                    },
                                                                                    "else_path": {
                                                                                          "type": "array",
                                                                                          "items": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "id": {
                                                                                                            "type": "string"
                                                                                                      },
                                                                                                      "if_else": {
                                                                                                            "type": "object",
                                                                                                            "properties": {
                                                                                                                  "conditions": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "else_path": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "then_path": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "conditions",
                                                                                                                  "then_path",
                                                                                                                  "else_path"
                                                                                                            ]
                                                                                                      },
                                                                                                      "level": {
                                                                                                            "type": "object",
                                                                                                            "properties": {
                                                                                                                  "ack_mode": {
                                                                                                                        "type": "string",
                                                                                                                        "enum": [
                                                                                                                              "all",
                                                                                                                              "first"
                                                                                                                        ]
                                                                                                                  },
                                                                                                                  "round_robin_config": {
                                                                                                                        "type": "object",
                                                                                                                        "properties": {
                                                                                                                              "enabled": {
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
                                                                                                                              },
                                                                                                                              "rotate_after_seconds": {
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
                                                                                                                              }
                                                                                                                        },
                                                                                                                        "required": [
                                                                                                                              "enabled"
                                                                                                                        ]
                                                                                                                  },
                                                                                                                  "targets": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "time_to_ack_interval_condition": {
                                                                                                                        "type": "string",
                                                                                                                        "enum": [
                                                                                                                              "active",
                                                                                                                              "inactive"
                                                                                                                        ]
                                                                                                                  },
                                                                                                                  "time_to_ack_seconds": {
                                                                                                                        "type": "number"
                                                                                                                  },
                                                                                                                  "time_to_ack_weekday_interval_config_id": {
                                                                                                                        "type": "string"
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "targets"
                                                                                                            ]
                                                                                                      },
                                                                                                      "notify_channel": {
                                                                                                            "type": "object",
                                                                                                            "properties": {
                                                                                                                  "targets": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "time_to_ack_interval_condition": {
                                                                                                                        "type": "string",
                                                                                                                        "enum": [
                                                                                                                              "active",
                                                                                                                              "inactive"
                                                                                                                        ]
                                                                                                                  },
                                                                                                                  "time_to_ack_seconds": {
                                                                                                                        "type": "number"
                                                                                                                  },
                                                                                                                  "time_to_ack_weekday_interval_config_id": {
                                                                                                                        "type": "string"
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "targets"
                                                                                                            ]
                                                                                                      },
                                                                                                      "repeat": {
                                                                                                            "type": "object",
                                                                                                            "properties": {
                                                                                                                  "repeat_times": {
                                                                                                                        "type": "number"
                                                                                                                  },
                                                                                                                  "to_node": {
                                                                                                                        "type": "string"
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "to_node",
                                                                                                                  "repeat_times"
                                                                                                            ]
                                                                                                      },
                                                                                                      "type": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "if_else",
                                                                                                                  "repeat",
                                                                                                                  "level",
                                                                                                                  "notify_channel"
                                                                                                            ]
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "id",
                                                                                                      "type"
                                                                                                ]
                                                                                          }
                                                                                    },
                                                                                    "then_path": {
                                                                                          "type": "array",
                                                                                          "items": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "id": {
                                                                                                            "type": "string"
                                                                                                      },
                                                                                                      "if_else": {
                                                                                                            "type": "object",
                                                                                                            "properties": {
                                                                                                                  "conditions": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "else_path": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "then_path": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "conditions",
                                                                                                                  "then_path",
                                                                                                                  "else_path"
                                                                                                            ]
                                                                                                      },
                                                                                                      "level": {
                                                                                                            "type": "object",
                                                                                                            "properties": {
                                                                                                                  "ack_mode": {
                                                                                                                        "type": "string",
                                                                                                                        "enum": [
                                                                                                                              "all",
                                                                                                                              "first"
                                                                                                                        ]
                                                                                                                  },
                                                                                                                  "round_robin_config": {
                                                                                                                        "type": "object",
                                                                                                                        "properties": {
                                                                                                                              "enabled": {
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
                                                                                                                              },
                                                                                                                              "rotate_after_seconds": {
                                                                                                                                    "type": "object",
                                                                                                                                    "additionalProperties": true
                                                                                                                              }
                                                                                                                        },
                                                                                                                        "required": [
                                                                                                                              "enabled"
                                                                                                                        ]
                                                                                                                  },
                                                                                                                  "targets": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "time_to_ack_interval_condition": {
                                                                                                                        "type": "string",
                                                                                                                        "enum": [
                                                                                                                              "active",
                                                                                                                              "inactive"
                                                                                                                        ]
                                                                                                                  },
                                                                                                                  "time_to_ack_seconds": {
                                                                                                                        "type": "number"
                                                                                                                  },
                                                                                                                  "time_to_ack_weekday_interval_config_id": {
                                                                                                                        "type": "string"
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "targets"
                                                                                                            ]
                                                                                                      },
                                                                                                      "notify_channel": {
                                                                                                            "type": "object",
                                                                                                            "properties": {
                                                                                                                  "targets": {
                                                                                                                        "type": "array",
                                                                                                                        "items": {
                                                                                                                              "type": "object",
                                                                                                                              "additionalProperties": true
                                                                                                                        }
                                                                                                                  },
                                                                                                                  "time_to_ack_interval_condition": {
                                                                                                                        "type": "string",
                                                                                                                        "enum": [
                                                                                                                              "active",
                                                                                                                              "inactive"
                                                                                                                        ]
                                                                                                                  },
                                                                                                                  "time_to_ack_seconds": {
                                                                                                                        "type": "number"
                                                                                                                  },
                                                                                                                  "time_to_ack_weekday_interval_config_id": {
                                                                                                                        "type": "string"
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "targets"
                                                                                                            ]
                                                                                                      },
                                                                                                      "repeat": {
                                                                                                            "type": "object",
                                                                                                            "properties": {
                                                                                                                  "repeat_times": {
                                                                                                                        "type": "number"
                                                                                                                  },
                                                                                                                  "to_node": {
                                                                                                                        "type": "string"
                                                                                                                  }
                                                                                                            },
                                                                                                            "required": [
                                                                                                                  "to_node",
                                                                                                                  "repeat_times"
                                                                                                            ]
                                                                                                      },
                                                                                                      "type": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "if_else",
                                                                                                                  "repeat",
                                                                                                                  "level",
                                                                                                                  "notify_channel"
                                                                                                            ]
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "id",
                                                                                                      "type"
                                                                                                ]
                                                                                          }
                                                                                    }
                                                                              },
                                                                              "required": [
                                                                                    "conditions",
                                                                                    "then_path",
                                                                                    "else_path"
                                                                              ]
                                                                        },
                                                                        "level": {
                                                                              "type": "object",
                                                                              "properties": {
                                                                                    "ack_mode": {
                                                                                          "type": "string",
                                                                                          "enum": [
                                                                                                "all",
                                                                                                "first"
                                                                                          ]
                                                                                    },
                                                                                    "round_robin_config": {
                                                                                          "type": "object",
                                                                                          "properties": {
                                                                                                "enabled": {
                                                                                                      "type": "boolean"
                                                                                                },
                                                                                                "rotate_after_seconds": {
                                                                                                      "type": "number"
                                                                                                }
                                                                                          },
                                                                                          "required": [
                                                                                                "enabled"
                                                                                          ]
                                                                                    },
                                                                                    "targets": {
                                                                                          "type": "array",
                                                                                          "items": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "id": {
                                                                                                            "type": "string"
                                                                                                      },
                                                                                                      "schedule_mode": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "currently_on_call",
                                                                                                                  "all_users_for_rota",
                                                                                                                  "all_users",
                                                                                                                  ""
                                                                                                            ]
                                                                                                      },
                                                                                                      "type": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "schedule",
                                                                                                                  "user",
                                                                                                                  "slack_channel",
                                                                                                                  "msteams_channel"
                                                                                                            ]
                                                                                                      },
                                                                                                      "urgency": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "high",
                                                                                                                  "low"
                                                                                                            ]
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "type",
                                                                                                      "id",
                                                                                                      "urgency"
                                                                                                ]
                                                                                          }
                                                                                    },
                                                                                    "time_to_ack_interval_condition": {
                                                                                          "type": "string",
                                                                                          "enum": [
                                                                                                "active",
                                                                                                "inactive"
                                                                                          ]
                                                                                    },
                                                                                    "time_to_ack_seconds": {
                                                                                          "type": "number"
                                                                                    },
                                                                                    "time_to_ack_weekday_interval_config_id": {
                                                                                          "type": "string"
                                                                                    }
                                                                              },
                                                                              "required": [
                                                                                    "targets"
                                                                              ]
                                                                        },
                                                                        "notify_channel": {
                                                                              "type": "object",
                                                                              "properties": {
                                                                                    "targets": {
                                                                                          "type": "array",
                                                                                          "items": {
                                                                                                "type": "object",
                                                                                                "properties": {
                                                                                                      "id": {
                                                                                                            "type": "string"
                                                                                                      },
                                                                                                      "schedule_mode": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "currently_on_call",
                                                                                                                  "all_users_for_rota",
                                                                                                                  "all_users",
                                                                                                                  ""
                                                                                                            ]
                                                                                                      },
                                                                                                      "type": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "schedule",
                                                                                                                  "user",
                                                                                                                  "slack_channel",
                                                                                                                  "msteams_channel"
                                                                                                            ]
                                                                                                      },
                                                                                                      "urgency": {
                                                                                                            "type": "string",
                                                                                                            "enum": [
                                                                                                                  "high",
                                                                                                                  "low"
                                                                                                            ]
                                                                                                      }
                                                                                                },
                                                                                                "required": [
                                                                                                      "type",
                                                                                                      "id",
                                                                                                      "urgency"
                                                                                                ]
                                                                                          }
                                                                                    },
                                                                                    "time_to_ack_interval_condition": {
                                                                                          "type": "string",
                                                                                          "enum": [
                                                                                                "active",
                                                                                                "inactive"
                                                                                          ]
                                                                                    },
                                                                                    "time_to_ack_seconds": {
                                                                                          "type": "number"
                                                                                    },
                                                                                    "time_to_ack_weekday_interval_config_id": {
                                                                                          "type": "string"
                                                                                    }
                                                                              },
                                                                              "required": [
                                                                                    "targets"
                                                                              ]
                                                                        },
                                                                        "repeat": {
                                                                              "type": "object",
                                                                              "properties": {
                                                                                    "repeat_times": {
                                                                                          "type": "number"
                                                                                    },
                                                                                    "to_node": {
                                                                                          "type": "string"
                                                                                    }
                                                                              },
                                                                              "required": [
                                                                                    "to_node",
                                                                                    "repeat_times"
                                                                              ]
                                                                        },
                                                                        "type": {
                                                                              "type": "string",
                                                                              "enum": [
                                                                                    "if_else",
                                                                                    "repeat",
                                                                                    "level",
                                                                                    "notify_channel"
                                                                              ]
                                                                        }
                                                                  },
                                                                  "required": [
                                                                        "id",
                                                                        "type"
                                                                  ]
                                                            }
                                                      }
                                                },
                                                "required": [
                                                      "conditions",
                                                      "then_path",
                                                      "else_path"
                                                ]
                                          },
                                          "level": {
                                                "type": "object",
                                                "properties": {
                                                      "ack_mode": {
                                                            "type": "string",
                                                            "enum": [
                                                                  "all",
                                                                  "first"
                                                            ]
                                                      },
                                                      "round_robin_config": {
                                                            "type": "object",
                                                            "properties": {
                                                                  "enabled": {
                                                                        "type": "boolean"
                                                                  },
                                                                  "rotate_after_seconds": {
                                                                        "type": "number"
                                                                  }
                                                            },
                                                            "required": [
                                                                  "enabled"
                                                            ]
                                                      },
                                                      "targets": {
                                                            "type": "array",
                                                            "items": {
                                                                  "type": "object",
                                                                  "properties": {
                                                                        "id": {
                                                                              "type": "string"
                                                                        },
                                                                        "schedule_mode": {
                                                                              "type": "string",
                                                                              "enum": [
                                                                                    "currently_on_call",
                                                                                    "all_users_for_rota",
                                                                                    "all_users",
                                                                                    ""
                                                                              ]
                                                                        },
                                                                        "type": {
                                                                              "type": "string",
                                                                              "enum": [
                                                                                    "schedule",
                                                                                    "user",
                                                                                    "slack_channel",
                                                                                    "msteams_channel"
                                                                              ]
                                                                        },
                                                                        "urgency": {
                                                                              "type": "string",
                                                                              "enum": [
                                                                                    "high",
                                                                                    "low"
                                                                              ]
                                                                        }
                                                                  },
                                                                  "required": [
                                                                        "type",
                                                                        "id",
                                                                        "urgency"
                                                                  ]
                                                            }
                                                      },
                                                      "time_to_ack_interval_condition": {
                                                            "type": "string",
                                                            "enum": [
                                                                  "active",
                                                                  "inactive"
                                                            ]
                                                      },
                                                      "time_to_ack_seconds": {
                                                            "type": "number"
                                                      },
                                                      "time_to_ack_weekday_interval_config_id": {
                                                            "type": "string"
                                                      }
                                                },
                                                "required": [
                                                      "targets"
                                                ]
                                          },
                                          "notify_channel": {
                                                "type": "object",
                                                "properties": {
                                                      "targets": {
                                                            "type": "array",
                                                            "items": {
                                                                  "type": "object",
                                                                  "properties": {
                                                                        "id": {
                                                                              "type": "string"
                                                                        },
                                                                        "schedule_mode": {
                                                                              "type": "string",
                                                                              "enum": [
                                                                                    "currently_on_call",
                                                                                    "all_users_for_rota",
                                                                                    "all_users",
                                                                                    ""
                                                                              ]
                                                                        },
                                                                        "type": {
                                                                              "type": "string",
                                                                              "enum": [
                                                                                    "schedule",
                                                                                    "user",
                                                                                    "slack_channel",
                                                                                    "msteams_channel"
                                                                              ]
                                                                        },
                                                                        "urgency": {
                                                                              "type": "string",
                                                                              "enum": [
                                                                                    "high",
                                                                                    "low"
                                                                              ]
                                                                        }
                                                                  },
                                                                  "required": [
                                                                        "type",
                                                                        "id",
                                                                        "urgency"
                                                                  ]
                                                            }
                                                      },
                                                      "time_to_ack_interval_condition": {
                                                            "type": "string",
                                                            "enum": [
                                                                  "active",
                                                                  "inactive"
                                                            ]
                                                      },
                                                      "time_to_ack_seconds": {
                                                            "type": "number"
                                                      },
                                                      "time_to_ack_weekday_interval_config_id": {
                                                            "type": "string"
                                                      }
                                                },
                                                "required": [
                                                      "targets"
                                                ]
                                          },
                                          "repeat": {
                                                "type": "object",
                                                "properties": {
                                                      "repeat_times": {
                                                            "type": "number"
                                                      },
                                                      "to_node": {
                                                            "type": "string"
                                                      }
                                                },
                                                "required": [
                                                      "to_node",
                                                      "repeat_times"
                                                ]
                                          },
                                          "type": {
                                                "type": "string",
                                                "enum": [
                                                      "if_else",
                                                      "repeat",
                                                      "level",
                                                      "notify_channel"
                                                ]
                                          }
                                    },
                                    "required": [
                                          "id",
                                          "type"
                                    ]
                              }
                        },
                        "team_ids": {
                              "type": "array",
                              "items": {
                                    "type": "string"
                              }
                        },
                        "working_hours": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "id": {
                                                "type": "string"
                                          },
                                          "name": {
                                                "type": "string"
                                          },
                                          "timezone": {
                                                "type": "string"
                                          },
                                          "weekday_intervals": {
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
                                          "timezone",
                                          "weekday_intervals"
                                    ]
                              }
                        }
                  },
                  "required": [
                        "id",
                        "name",
                        "path",
                        "levels",
                        "repeat_times",
                        "team_ids"
                  ]
            }
      },
      "required": [
            "escalation_path"
      ]
},
    },
  },
};

export default escalationsV2_CreatePath;
