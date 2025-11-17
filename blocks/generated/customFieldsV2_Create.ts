import { AppBlock, events } from "@slflows/sdk/v1";

const customFieldsV2_Create: AppBlock = {
  name: "Create Custom Fields V2",
  description: `Create a new custom field`,
  category: "API",

  inputs: {
    default: {
      config: {
      "catalog_type_id": {
            "name": "Catalog Type Id",
            "description": "For catalog fields, the ID of the associated catalog type",
            "type": "string",
            "required": false
      },
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

        let url = "https://api.incident.io/v2/custom_fields";
        const body: Record<string, any> = {};
        if (input.event.inputConfig.catalog_type_id !== undefined) {
          body.catalog_type_id = input.event.inputConfig.catalog_type_id;
        }
        if (input.event.inputConfig.description !== undefined) {
          body.description = input.event.inputConfig.description;
        }
        if (input.event.inputConfig.field_type !== undefined) {
          body.field_type = input.event.inputConfig.field_type;
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

export default customFieldsV2_Create;
