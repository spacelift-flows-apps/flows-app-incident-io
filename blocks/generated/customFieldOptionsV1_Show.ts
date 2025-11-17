import { AppBlock, events } from "@slflows/sdk/v1";

const customFieldOptionsV1_Show: AppBlock = {
  name: "Show Custom Field Options V1",
  description: `Get a single custom field option`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "Unique identifier for the custom field option",
            "type": "string",
            "required": true
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v1/custom_field_options/{id}";
        url = url.replace("{id}", encodeURIComponent(String(input.event.inputConfig.id)));
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
            "custom_field_option": {
                  "type": "object",
                  "properties": {
                        "custom_field_id": {
                              "type": "string"
                        },
                        "id": {
                              "type": "string"
                        },
                        "sort_key": {
                              "type": "number"
                        },
                        "value": {
                              "type": "string"
                        }
                  },
                  "required": [
                        "id",
                        "custom_field_id",
                        "value",
                        "sort_key"
                  ]
            }
      },
      "required": [
            "custom_field_option"
      ]
},
    },
  },
};

export default customFieldOptionsV1_Show;
