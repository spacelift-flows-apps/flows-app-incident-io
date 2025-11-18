import { AppBlock, events } from "@slflows/sdk/v1";

const incidentUpdatesV2_List: AppBlock = {
  name: "List Incident Updates V2",
  description: `List all incident updates for an organisation, or for a specific incident.`,
  category: "Incident Updates V2",

  inputs: {
    default: {
      config: {
      "incident_id": {
            "name": "Incident Id",
            "description": "Incident whose updates you want to list",
            "type": "string",
            "required": false
      },
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
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/incident_updates";
        const queryParams = new URLSearchParams();
        if (input.event.inputConfig.incident_id !== undefined) {
          queryParams.append("incident_id", String(input.event.inputConfig.incident_id));
        }
        if (input.event.inputConfig.page_size !== undefined) {
          queryParams.append("page_size", String(input.event.inputConfig.page_size));
        }
        if (input.event.inputConfig.after !== undefined) {
          queryParams.append("after", String(input.event.inputConfig.after));
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
            "incident_updates": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "created_at": {
                                    "type": "string"
                              },
                              "id": {
                                    "type": "string"
                              },
                              "incident_id": {
                                    "type": "string"
                              },
                              "merged_into_incident_id": {
                                    "type": "string"
                              },
                              "message": {
                                    "type": "string"
                              },
                              "new_incident_status": {
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
                              "new_severity": {
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
                              "updater": {
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
                              }
                        },
                        "required": [
                              "id",
                              "incident_id",
                              "new_incident_status",
                              "updater",
                              "created_at",
                              "next_update_in_minutes"
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
                        }
                  },
                  "required": [
                        "page_size"
                  ]
            }
      },
      "required": [
            "incident_updates"
      ]
},
    },
  },
};

export default incidentUpdatesV2_List;
