import { AppBlock, events } from "@slflows/sdk/v1";

const incidentTimestampsV2_List: AppBlock = {
  name: "List Incident Timestamps V2",
  description: `List all incident timestamps for an organisation.`,
  category: "Incident Timestamps V2",

  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/incident_timestamps";
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
            "incident_timestamps": {
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
                              "rank": {
                                    "type": "number"
                              }
                        },
                        "required": [
                              "id",
                              "name",
                              "description",
                              "rank",
                              "set_on_creation",
                              "set_on_acceptance",
                              "set_on_resolution",
                              "set_by_rules",
                              "timestamp_type",
                              "created_at",
                              "updated_at"
                        ]
                  }
            }
      },
      "required": [
            "incident_timestamps"
      ]
},
    },
  },
};

export default incidentTimestampsV2_List;
