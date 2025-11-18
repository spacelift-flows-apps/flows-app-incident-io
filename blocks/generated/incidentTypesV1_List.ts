import { AppBlock, events } from "@slflows/sdk/v1";

const incidentTypesV1_List: AppBlock = {
  name: "List Incident Types V1",
  description: `List all incident types for an organisation.`,
  category: "Incident Types V1",

  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v1/incident_types";
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
            "incident_types": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "create_in_triage": {
                                    "type": "string",
                                    "enum": [
                                          "always",
                                          "optional"
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
                              "is_default": {
                                    "type": "boolean"
                              },
                              "name": {
                                    "type": "string"
                              },
                              "private_incidents_only": {
                                    "type": "boolean"
                              },
                              "updated_at": {
                                    "type": "string"
                              }
                        },
                        "required": [
                              "id",
                              "name",
                              "is_default",
                              "description",
                              "private_incidents_only",
                              "created_at",
                              "updated_at",
                              "create_in_triage",
                              "severity_aliases",
                              "rank",
                              "override_auto_close_incidents",
                              "auto_close_incidents",
                              "auto_close_incidents_delay_days",
                              "override_auto_archive_slack_channels",
                              "auto_archive_slack_channels",
                              "auto_archive_slack_channels_delay_days"
                        ]
                  }
            }
      },
      "required": [
            "incident_types"
      ]
},
    },
  },
};

export default incidentTypesV1_List;
