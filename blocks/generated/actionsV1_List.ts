import { AppBlock, events } from "@slflows/sdk/v1";

const actionsV1_List: AppBlock = {
  name: "List Actions V1",
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
      "is_follow_up": {
            "name": "Is Follow Up",
            "description": "Filter to actions marked as being follow up actions",
            "type": "boolean",
            "required": false
      },
      "incident_mode": {
            "name": "Incident Mode",
            "description": "Filter to actions from incidents of the given mode. If not set, only actions from `real` incidents are returned",
            "type": "string",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v1/actions";
        const queryParams = new URLSearchParams();
        if (input.event.inputConfig.incident_id !== undefined) {
          queryParams.append("incident_id", String(input.event.inputConfig.incident_id));
        }
        if (input.event.inputConfig.is_follow_up !== undefined) {
          queryParams.append("is_follow_up", String(input.event.inputConfig.is_follow_up));
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
                              "description": {
                                    "type": "string"
                              },
                              "external_issue_reference": {
                                    "type": "object",
                                    "properties": {
                                          "issue_name": {
                                                "type": "string"
                                          },
                                          "issue_permalink": {
                                                "type": "string"
                                          },
                                          "provider": {
                                                "type": "string",
                                                "enum": [
                                                      "asana",
                                                      "azure_devops",
                                                      "click_up",
                                                      "linear",
                                                      "jira",
                                                      "jira_server",
                                                      "github",
                                                      "gitlab",
                                                      "service_now",
                                                      "shortcut"
                                                ]
                                          }
                                    },
                                    "additionalProperties": true
                              },
                              "follow_up": {
                                    "type": "boolean"
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
                              "status",
                              "follow_up",
                              "created_at",
                              "updated_at"
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

export default actionsV1_List;
