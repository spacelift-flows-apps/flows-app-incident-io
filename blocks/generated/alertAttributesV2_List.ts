import { AppBlock, events } from "@slflows/sdk/v1";

const alertAttributesV2_List: AppBlock = {
  name: "List Alert Attributes V2",
  description: `List alert attributes.`,
  category: "API",

  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/alert_attributes";
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
            "alert_attributes": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "array": {
                                    "type": "boolean"
                              },
                              "id": {
                                    "type": "string"
                              },
                              "name": {
                                    "type": "string"
                              },
                              "required": {
                                    "type": "boolean"
                              },
                              "type": {
                                    "type": "string"
                              }
                        },
                        "required": [
                              "id",
                              "name",
                              "type",
                              "array",
                              "required"
                        ]
                  }
            }
      },
      "required": [
            "alert_attributes"
      ]
},
    },
  },
};

export default alertAttributesV2_List;
