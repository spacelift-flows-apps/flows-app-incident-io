import { AppBlock, events } from "@slflows/sdk/v1";

const statusPagesV1_ListResponseIncidents: AppBlock = {
  name: "ListResponseIncidents Status Pages V1",
  description: `List the linked Response incidents for a status page incident.`,
  category: "Status Pages V1",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "ID of the status page",
            "type": "string",
            "required": true
      },
      "incident_id": {
            "name": "Incident Id",
            "description": "ID of the status page incident",
            "type": "string",
            "required": true
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v1/status-pages/{id}/incidents/{incident_id}/response-incidents";
        url = url.replace("{id}", encodeURIComponent(String(input.event.inputConfig.id)));
        url = url.replace("{incident_id}", encodeURIComponent(String(input.event.inputConfig.incident_id)));
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
            "incidents": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "id": {
                                    "type": "string"
                              },
                              "linked_at": {
                                    "type": "string"
                              }
                        },
                        "required": [
                              "id",
                              "linked_at"
                        ]
                  }
            }
      },
      "required": [
            "incidents"
      ]
},
    },
  },
};

export default statusPagesV1_ListResponseIncidents;
