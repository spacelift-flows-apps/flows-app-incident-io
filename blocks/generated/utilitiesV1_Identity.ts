import { AppBlock, events } from "@slflows/sdk/v1";

const utilitiesV1_Identity: AppBlock = {
  name: "Identity Utilities V1",
  description: `Test if your API key is valid, and which roles it has.`,
  category: "API",

  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v1/identity";
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
            "identity": {
                  "type": "object",
                  "properties": {
                        "dashboard_url": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "name": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "roles": {
                              "type": "object",
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "name",
                        "roles",
                        "dashboard_url"
                  ]
            }
      },
      "required": [
            "identity"
      ]
},
    },
  },
};

export default utilitiesV1_Identity;
