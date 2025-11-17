import { AppBlock, events } from "@slflows/sdk/v1";

const actionsV2_List: AppBlock = {
  name: "List Actions V2",
  description: `List all actions for an organisation.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "incident_id": {
            "name": "Incident Id",
            "description": "Find actions related to this incident",
            "type": "string",
            "required": false
      },
      "incident_mode": {
            "name": "Incident Mode",
            "description": "Filter to actions from incidents of the given mode. If not set, only actions from `standard` and `retrospective` incidents are returned",
            "type": "string",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/actions";
        const queryParams = new URLSearchParams();
        if (input.event.inputConfig.incident_id !== undefined) {
          queryParams.append("incident_id", String(input.event.inputConfig.incident_id));
        }
        if (input.event.inputConfig.incident_mode !== undefined) {
          queryParams.append("incident_mode", String(input.event.inputConfig.incident_mode));
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
            "actions": {
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
                              "completed_at": {
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
                              "description": {
                                    "type": "string"
                              },
                              "id": {
                                    "type": "string"
                              },
                              "incident_id": {
                                    "type": "string"
                              },
                              "status": {
                                    "type": "string",
                                    "enum": [
                                          "outstanding",
                                          "completed",
                                          "deleted",
                                          "not_doing"
                                    ]
                              },
                              "updated_at": {
                                    "type": "string"
                              }
                        },
                        "required": [
                              "id",
                              "incident_id",
                              "creator",
                              "description",
                              "status",
                              "created_at",
                              "updated_at",
                              "organisation_id"
                        ]
                  }
            }
      },
      "required": [
            "actions"
      ]
},
    },
  },
};

export default actionsV2_List;
