import { AppBlock, events } from "@slflows/sdk/v1";

const catalogV2_ListResources: AppBlock = {
  name: "ListResources Catalog V2",
  description: `List available engine resources for the catalog.`,
  category: "API",

  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/catalog_resources";
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
            "resources": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "category": {
                                    "type": "string",
                                    "enum": [
                                          "primitive",
                                          "custom",
                                          "external"
                                    ]
                              },
                              "description": {
                                    "type": "string"
                              },
                              "label": {
                                    "type": "string"
                              },
                              "type": {
                                    "type": "string"
                              },
                              "value_docstring": {
                                    "type": "string"
                              }
                        },
                        "required": [
                              "type",
                              "label",
                              "description",
                              "value_docstring",
                              "category",
                              "config",
                              "is_user_link"
                        ]
                  }
            }
      },
      "required": [
            "resources"
      ]
},
    },
  },
};

export default catalogV2_ListResources;
