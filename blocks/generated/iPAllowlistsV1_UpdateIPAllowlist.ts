import { AppBlock, events } from "@slflows/sdk/v1";

const iPAllowlistsV1_UpdateIPAllowlist: AppBlock = {
  name: "UpdateIPAllowlist IPAllowlists V1",
  description: `Update the IP allowlist for your organisation`,
  category: "API",

  inputs: {
    default: {
      config: {
      "allowlist": {
            "name": "Allowlist",
            "description": "A list of IP addresses or CIDR prefixes to allow",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "label": {
                                    "type": "string"
                              },
                              "value": {
                                    "type": "string"
                              }
                        },
                        "required": [
                              "value"
                        ]
                  }
            },
            "required": false
      },
      "enabled": {
            "name": "Enabled",
            "description": "Whether this IP allowlist is enabled or not",
            "type": "boolean",
            "required": false
      },
      "version": {
            "name": "Version",
            "description": "The version of this IP allowlist",
            "type": "number",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v1/ip_allowlists";
        const body: Record<string, any> = {};
        if (input.event.inputConfig.allowlist !== undefined) {
          body.allowlist = input.event.inputConfig.allowlist;
        }
        if (input.event.inputConfig.enabled !== undefined) {
          body.enabled = input.event.inputConfig.enabled;
        }
        if (input.event.inputConfig.version !== undefined) {
          body.version = input.event.inputConfig.version;
        }
        const headers: Record<string, string> = {};

        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
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
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "label": {
                                                "type": "string"
                                          },
                                          "value": {
                                                "type": "string"
                                          }
                                    },
                                    "required": [
                                          "value"
                                    ]
                              }
                        },
                        "enabled": {
                              "type": "boolean"
                        },
                        "updated_at": {
                              "type": "string"
                        },
                        "version": {
                              "type": "number"
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

export default iPAllowlistsV1_UpdateIPAllowlist;
