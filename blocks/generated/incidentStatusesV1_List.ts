import { AppBlock, events } from "@slflows/sdk/v1";

const incidentStatusesV1_List: AppBlock = {
  name: "List Incident Statuses V1",
  description: `List all incident statuses for an organisation.`,
  category: "API",

  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v1/incident_statuses";
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
            "incident_statuses": {
                  "type": "array",
                  "items": {
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
                  }
            }
      },
      "required": [
            "incident_statuses"
      ]
},
    },
  },
};

export default incidentStatusesV1_List;
