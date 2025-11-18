import { AppBlock, events } from "@slflows/sdk/v1";

const alertAttributesV2_Create: AppBlock = {
  name: "Create Alert Attributes V2",
  description: `Create a new alert attribute.`,
  category: "Alert Attributes V2",

  inputs: {
    default: {
      config: {
      "array": {
            "name": "Array",
            "description": "Whether this attribute is an array",
            "type": "boolean",
            "required": false
      },
      "name": {
            "name": "Name",
            "description": "Unique name of this attribute",
            "type": "string",
            "required": false
      },
      "required": {
            "name": "Required",
            "description": "Whether this attribute is required. If this field is not set, the existing setting will be preserved.",
            "type": "boolean",
            "required": false
      },
      "type": {
            "name": "Type",
            "description": "Engine resource name for this attribute",
            "type": "string",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/alert_attributes";
        const body: Record<string, any> = {};
        if (input.event.inputConfig.array !== undefined) {
          body.array = input.event.inputConfig.array;
        }
        if (input.event.inputConfig.name !== undefined) {
          body.name = input.event.inputConfig.name;
        }
        if (input.event.inputConfig.required !== undefined) {
          body.required = input.event.inputConfig.required;
        }
        if (input.event.inputConfig.type !== undefined) {
          body.type = input.event.inputConfig.type;
        }
        const headers: Record<string, string> = {};

        const response = await fetch(url, {
          method: "POST",
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
            "alert_attribute": {
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
      },
      "required": [
            "alert_attribute"
      ]
},
    },
  },
};

export default alertAttributesV2_Create;
