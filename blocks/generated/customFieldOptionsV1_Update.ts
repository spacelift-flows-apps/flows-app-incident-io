import { AppBlock, events } from "@slflows/sdk/v1";

const customFieldOptionsV1_Update: AppBlock = {
  name: "Update Custom Field Options V1",
  description: `Update a custom field option`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "Unique identifier for the custom field option",
            "type": "string",
            "required": true
      },
      "sort_key": {
            "name": "Sort Key",
            "description": "Sort key used to order the custom field options correctly",
            "type": "number",
            "required": false
      },
      "value": {
            "name": "Value",
            "description": "Human readable name for the custom field option",
            "type": "string",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v1/custom_field_options/{id}";
        url = url.replace("{id}", encodeURIComponent(String(input.event.inputConfig.id)));
        const body: Record<string, any> = {};
        if (input.event.inputConfig.sort_key !== undefined) {
          body.sort_key = input.event.inputConfig.sort_key;
        }
        if (input.event.inputConfig.value !== undefined) {
          body.value = input.event.inputConfig.value;
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

export default customFieldOptionsV1_Update;
