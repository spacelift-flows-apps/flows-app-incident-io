import { AppBlock, events } from "@slflows/sdk/v1";

const alertRoutesV2_Create: AppBlock = {
  name: "Create Alert Routes V2",
  description: `Create a new alert route in your account.`,
  category: "API",

  inputs: {
    default: {
      config: {
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
                                          },
                                          "users": {
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
                              "additionalProperties": true
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
                              "additionalProperties": true
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

        let url = "https://api.incident.io/v2/alert_routes";
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

export default alertRoutesV2_Create;
