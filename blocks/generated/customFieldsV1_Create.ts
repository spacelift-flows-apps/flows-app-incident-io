import { AppBlock, events } from "@slflows/sdk/v1";

const customFieldsV1_Create: AppBlock = {
  name: "Create Custom Fields V1",
  description: `Create a new custom field`,
  category: "API",

  inputs: {
    default: {
      config: {
      "description": {
            "name": "Description",
            "description": "Description of the custom field",
            "type": "string",
            "required": false
      },
      "field_type": {
            "name": "Field Type",
            "description": "Type of custom field",
            "type": "string",
            "required": false
      },
      "name": {
            "name": "Name",
            "description": "Human readable name for the custom field",
            "type": "string",
            "required": false
      },
      "required": {
            "name": "Required",
            "description": "When this custom field must be set during the incident lifecycle. [DEPRECATED: please use required_v2 instead].",
            "type": "string",
            "required": false
      },
      "required_v2": {
            "name": "Required V2",
            "description": "When this custom field must be set during the incident lifecycle.",
            "type": "string",
            "required": false
      },
      "show_before_closure": {
            "name": "Show Before Closure",
            "description": "Whether a custom field should be shown in the incident resolve modal. If this custom field is required before resolution, but no value has been set for it, the field will be shown in the resolve modal whatever the value of this setting.",
            "type": "boolean",
            "required": false
      },
      "show_before_creation": {
            "name": "Show Before Creation",
            "description": "Whether a custom field should be shown in the incident creation modal. This must be true if the field is always required.",
            "type": "boolean",
            "required": false
      },
      "show_before_update": {
            "name": "Show Before Update",
            "description": "Whether a custom field should be shown in the incident update modal.",
            "type": "boolean",
            "required": false
      },
      "show_in_announcement_post": {
            "name": "Show In Announcement Post",
            "description": "Whether a custom field should be shown in the list of fields as part of the announcement post when set.",
            "type": "boolean",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v1/custom_fields";
        const body: Record<string, any> = {};
        if (input.event.inputConfig.description !== undefined) {
          body.description = input.event.inputConfig.description;
        }
        if (input.event.inputConfig.field_type !== undefined) {
          body.field_type = input.event.inputConfig.field_type;
        }
        if (input.event.inputConfig.name !== undefined) {
          body.name = input.event.inputConfig.name;
        }
        if (input.event.inputConfig.required !== undefined) {
          body.required = input.event.inputConfig.required;
        }
        if (input.event.inputConfig.required_v2 !== undefined) {
          body.required_v2 = input.event.inputConfig.required_v2;
        }
        if (input.event.inputConfig.show_before_closure !== undefined) {
          body.show_before_closure = input.event.inputConfig.show_before_closure;
        }
        if (input.event.inputConfig.show_before_creation !== undefined) {
          body.show_before_creation = input.event.inputConfig.show_before_creation;
        }
        if (input.event.inputConfig.show_before_update !== undefined) {
          body.show_before_update = input.event.inputConfig.show_before_update;
        }
        if (input.event.inputConfig.show_in_announcement_post !== undefined) {
          body.show_in_announcement_post = input.event.inputConfig.show_in_announcement_post;
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
            "custom_field": {
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
      },
      "required": [
            "custom_field"
      ]
},
    },
  },
};

export default customFieldsV1_Create;
