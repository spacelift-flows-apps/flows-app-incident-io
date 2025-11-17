import { AppBlock, events } from "@slflows/sdk/v1";

const iPAllowlistsV1_ShowIPAllowlist: AppBlock = {
  name: "ShowIPAllowlist IPAllowlists V1",
  description: `Show the IP allowlist for your organisation`,
  category: "API",

  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v1/ip_allowlists";
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
            "ip_allowlist": {
                  "type": "object",
                  "properties": {
                        "allowlist": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "enabled": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "updated_at": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "version": {
                              "type": "object",
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "version",
                        "enabled",
                        "allowlist"
                  ]
            }
      },
      "required": [
            "ip_allowlist"
      ]
},
    },
  },
};

export default iPAllowlistsV1_ShowIPAllowlist;
