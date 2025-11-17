import { AppBlock, events } from "@slflows/sdk/v1";

const catalogV2_ListEntries: AppBlock = {
  name: "ListEntries Catalog V2",
  description: `List entries for a catalog type.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "catalog_type_id": {
            "name": "Catalog Type Id",
            "description": "ID of this catalog type",
            "type": "string",
            "required": true
      },
      "page_size": {
            "name": "Page Size",
            "description": "Integer number of records to return",
            "type": "number",
            "required": false
      },
      "after": {
            "name": "After",
            "description": "An record's ID. This endpoint will return a list of records after this ID in relation to the API response order.",
            "type": "string",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/catalog_entries";
        const queryParams = new URLSearchParams();
        if (input.event.inputConfig.catalog_type_id !== undefined) {
          queryParams.append("catalog_type_id", String(input.event.inputConfig.catalog_type_id));
        }
        if (input.event.inputConfig.page_size !== undefined) {
          queryParams.append("page_size", String(input.event.inputConfig.page_size));
        }
        if (input.event.inputConfig.after !== undefined) {
          queryParams.append("after", String(input.event.inputConfig.after));
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
            "catalog_entries": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "additionalProperties": true
                  }
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
                        "semantic_type": {
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
                        }
                  },
                  "required": [
                        "id",
                        "name",
                        "description",
                        "type_name",
                        "semantic_type",
                        "ranked",
                        "schema",
                        "icon",
                        "categories",
                        "color",
                        "is_editable",
                        "annotations",
                        "created_at",
                        "updated_at",
                        "engine_resource_type",
                        "mode",
                        "use_name_as_identifier"
                  ]
            },
            "pagination_meta": {
                  "type": "object",
                  "properties": {
                        "after": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "page_size": {
                              "type": "object",
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "page_size"
                  ]
            }
      },
      "required": [
            "catalog_type",
            "catalog_entries",
            "pagination_meta"
      ]
},
    },
  },
};

export default catalogV2_ListEntries;
