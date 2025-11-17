import { AppBlock, events } from "@slflows/sdk/v1";

const catalogV3_ShowEntry: AppBlock = {
  name: "ShowEntry Catalog V3",
  description: `Show a single catalog entry.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "ID of this catalog entry",
            "type": "string",
            "required": true
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v3/catalog_entries/{id}";
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
            },
            "catalog_type": {
                  "type": "object",
                  "properties": {
                        "annotations": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "categories": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "color": {
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
                        "dynamic_resource_parameter": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "estimated_count": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "icon": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "is_editable": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "last_synced_at": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "name": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "ranked": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "registry_type": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "required_integrations": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "schema": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "source_repo_url": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "type_name": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "updated_at": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "use_name_as_identifier": {
                              "type": "object",
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "id",
                        "name",
                        "description",
                        "type_name",
                        "ranked",
                        "schema",
                        "icon",
                        "categories",
                        "color",
                        "is_editable",
                        "annotations",
                        "created_at",
                        "updated_at",
                        "use_name_as_identifier",
                        "engine_resource_type",
                        "mode"
                  ]
            }
      },
      "required": [
            "catalog_type",
            "catalog_entry"
      ]
},
    },
  },
};

export default catalogV3_ShowEntry;
