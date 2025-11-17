import { AppBlock, events } from "@slflows/sdk/v1";

const catalogV3_CreateEntry: AppBlock = {
  name: "CreateEntry Catalog V3",
  description: `Create an entry within the catalog. We support a maximum of 50,000 entries per type.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "aliases": {
            "name": "Aliases",
            "description": "Optional aliases that can be used to reference this entry",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "string"
                  }
            },
            "required": false
      },
      "attribute_values": {
            "name": "Attribute Values",
            "description": "Values of this entry",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "catalog_type_id": {
            "name": "Catalog Type Id",
            "description": "ID of this catalog type",
            "type": "string",
            "required": false
      },
      "external_id": {
            "name": "External Id",
            "description": "An optional alternative ID for this entry, which is ensured to be unique for the type",
            "type": "string",
            "required": false
      },
      "name": {
            "name": "Name",
            "description": "Name is the human readable name of this entry",
            "type": "string",
            "required": false
      },
      "rank": {
            "name": "Rank",
            "description": "When catalog type is ranked, this is used to help order things",
            "type": "number",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v3/catalog_entries";
        const body: Record<string, any> = {};
        if (input.event.inputConfig.aliases !== undefined) {
          body.aliases = input.event.inputConfig.aliases;
        }
        if (input.event.inputConfig.attribute_values !== undefined) {
          body.attribute_values = input.event.inputConfig.attribute_values;
        }
        if (input.event.inputConfig.catalog_type_id !== undefined) {
          body.catalog_type_id = input.event.inputConfig.catalog_type_id;
        }
        if (input.event.inputConfig.external_id !== undefined) {
          body.external_id = input.event.inputConfig.external_id;
        }
        if (input.event.inputConfig.name !== undefined) {
          body.name = input.event.inputConfig.name;
        }
        if (input.event.inputConfig.rank !== undefined) {
          body.rank = input.event.inputConfig.rank;
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
            "catalog_entry": {
                  "type": "object",
                  "properties": {
                        "aliases": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "archived_at": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "attribute_values": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "catalog_type_id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "created_at": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "external_id": {
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
                        "rank": {
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
                        "catalog_type_id",
                        "name",
                        "aliases",
                        "rank",
                        "attribute_values",
                        "created_at",
                        "updated_at"
                  ]
            }
      },
      "required": [
            "catalog_entry"
      ]
},
    },
  },
};

export default catalogV3_CreateEntry;
