import { AppBlock, events } from "@slflows/sdk/v1";

const customFieldsV1_List: AppBlock = {
  name: "List Custom Fields V1",
  description: `List all custom fields for an organisation.`,
  category: "API",

  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v1/custom_fields";
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
            "custom_fields": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "catalog_type_id": {
                                    "type": "string"
                              },
                              "created_at": {
                                    "type": "string"
                              },
                              "description": {
                                    "type": "string"
                              },
                              "field_type": {
                                    "type": "string",
                                    "enum": [
                                          "single_select",
                                          "multi_select",
                                          "text",
                                          "link",
                                          "numeric"
                                    ]
                              },
                              "id": {
                                    "type": "string"
                              },
                              "name": {
                                    "type": "string"
                              },
                              "options": {
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
                              "required": {
                                    "type": "string",
                                    "enum": [
                                          "never",
                                          "before_closure",
                                          "always"
                                    ]
                              },
                              "required_v2": {
                                    "type": "string",
                                    "enum": [
                                          "never",
                                          "before_resolution",
                                          "always"
                                    ]
                              },
                              "show_before_closure": {
                                    "type": "boolean"
                              },
                              "show_before_creation": {
                                    "type": "boolean"
                              },
                              "show_before_update": {
                                    "type": "boolean"
                              },
                              "show_in_announcement_post": {
                                    "type": "boolean"
                              },
                              "updated_at": {
                                    "type": "string"
                              }
                        },
                        "required": [
                              "id",
                              "name",
                              "description",
                              "field_type",
                              "show_before_creation",
                              "show_before_closure",
                              "show_before_update",
                              "options",
                              "created_at",
                              "updated_at"
                        ]
                  }
            }
      },
      "required": [
            "custom_fields"
      ]
},
    },
  },
};

export default customFieldsV1_List;
