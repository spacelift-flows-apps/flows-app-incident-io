import { AppBlock, events } from "@slflows/sdk/v1";

const customFieldOptionsV1_List: AppBlock = {
  name: "List Custom Field Options V1",
  description: `Show custom field options for a custom field`,
  category: "API",

  inputs: {
    default: {
      config: {
      "page_size": {
            "name": "Page Size",
            "description": "Integer number of records to return",
            "type": "number",
            "required": false
      },
      "after": {
            "name": "After",
            "description": "A custom field option's ID. This endpoint will return a list of custom field options created after this option.",
            "type": "string",
            "required": false
      },
      "custom_field_id": {
            "name": "Custom Field Id",
            "description": "The custom field to list options for.",
            "type": "string",
            "required": true
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v1/custom_field_options";
        const queryParams = new URLSearchParams();
        if (input.event.inputConfig.page_size !== undefined) {
          queryParams.append("page_size", String(input.event.inputConfig.page_size));
        }
        if (input.event.inputConfig.after !== undefined) {
          queryParams.append("after", String(input.event.inputConfig.after));
        }
        if (input.event.inputConfig.custom_field_id !== undefined) {
          queryParams.append("custom_field_id", String(input.event.inputConfig.custom_field_id));
        }
        if (queryParams.toString()) url += "?" + queryParams.toString();
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
            "custom_field_options": {
                  "type": "array",
                  "items": {
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
            "pagination_meta": {
                  "type": "object",
                  "properties": {
                        "after": {
                              "type": "string"
                        },
                        "page_size": {
                              "type": "number"
                        }
                  },
                  "required": [
                        "page_size"
                  ]
            }
      },
      "required": [
            "custom_field_options",
            "pagination_meta"
      ]
},
    },
  },
};

export default customFieldOptionsV1_List;
