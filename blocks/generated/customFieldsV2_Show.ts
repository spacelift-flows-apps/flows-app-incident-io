import { AppBlock, events } from "@slflows/sdk/v1";

const customFieldsV2_Show: AppBlock = {
  name: "Show Custom Fields V2",
  description: `Get a single custom field.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "Unique identifier for the custom field",
            "type": "string",
            "required": true
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/custom_fields/{id}";
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
            "custom_field": {
                  "type": "object",
                  "properties": {
                        "catalog_type_id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "created_at": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "description": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "field_type": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "filter_by": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "group_by_catalog_attribute_id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "helptext_catalog_attribute_id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "name": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "updated_at": {
                              "type": "object",
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "id",
                        "name",
                        "description",
                        "field_type",
                        "cannot_be_unset",
                        "created_at",
                        "updated_at"
                  ]
            }
      },
      "required": [
            "custom_field"
      ]
},
    },
  },
};

export default customFieldsV2_Show;
