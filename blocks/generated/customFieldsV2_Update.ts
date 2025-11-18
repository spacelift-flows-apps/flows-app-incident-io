import { AppBlock, events } from "@slflows/sdk/v1";

const customFieldsV2_Update: AppBlock = {
  name: "Update Custom Fields V2",
  description: `Update the details of a custom field`,
  category: "Custom Fields V2",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "Unique identifier for the custom field",
            "type": "string",
            "required": true
      },
      "description": {
            "name": "Description",
            "description": "Description of the custom field",
            "type": "string",
            "required": false
      },
      "filter_by": {
            "name": "Filter By",
            "description": "Request body field: filter_by",
            "type": {
                  "type": "object",
                  "properties": {
                        "catalog_attribute_id": {
                              "type": "string"
                        },
                        "custom_field_id": {
                              "type": "string"
                        }
                  },
                  "required": [
                        "custom_field_id",
                        "catalog_attribute_id"
                  ]
            },
            "required": false
      },
      "group_by_catalog_attribute_id": {
            "name": "Group By Catalog Attribute Id",
            "description": "For catalog fields, the ID of the attribute used to group catalog entries (if applicable)",
            "type": "string",
            "required": false
      },
      "helptext_catalog_attribute_id": {
            "name": "Helptext Catalog Attribute Id",
            "description": "Which catalog attribute provides helptext for the options",
            "type": "string",
            "required": false
      },
      "name": {
            "name": "Name",
            "description": "Human readable name for the custom field",
            "type": "string",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/custom_fields/{id}";
        url = url.replace("{id}", encodeURIComponent(String(input.event.inputConfig.id)));
        const body: Record<string, any> = {};
        if (input.event.inputConfig.description !== undefined) {
          body.description = input.event.inputConfig.description;
        }
        if (input.event.inputConfig.filter_by !== undefined) {
          body.filter_by = input.event.inputConfig.filter_by;
        }
        if (input.event.inputConfig.group_by_catalog_attribute_id !== undefined) {
          body.group_by_catalog_attribute_id = input.event.inputConfig.group_by_catalog_attribute_id;
        }
        if (input.event.inputConfig.helptext_catalog_attribute_id !== undefined) {
          body.helptext_catalog_attribute_id = input.event.inputConfig.helptext_catalog_attribute_id;
        }
        if (input.event.inputConfig.name !== undefined) {
          body.name = input.event.inputConfig.name;
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
                        "filter_by": {
                              "type": "object",
                              "properties": {
                                    "catalog_attribute_id": {
                                          "type": "string"
                                    },
                                    "custom_field_id": {
                                          "type": "string"
                                    }
                              },
                              "required": [
                                    "custom_field_id",
                                    "catalog_attribute_id"
                              ]
                        },
                        "group_by_catalog_attribute_id": {
                              "type": "string"
                        },
                        "helptext_catalog_attribute_id": {
                              "type": "string"
                        },
                        "id": {
                              "type": "string"
                        },
                        "name": {
                              "type": "string"
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

export default customFieldsV2_Update;
