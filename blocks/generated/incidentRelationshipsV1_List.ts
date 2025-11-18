import { AppBlock, events } from "@slflows/sdk/v1";

const incidentRelationshipsV1_List: AppBlock = {
  name: "List Incident Relationships V1",
  description: `List related incidents for a specific incident.`,
  category: "Incident Relationships V1",

  inputs: {
    default: {
      config: {
      "incident_id": {
            "name": "Incident Id",
            "description": "ID of the incident to find relationships for",
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

        let url = "https://api.incident.io/v1/incident_relationships";
        const queryParams = new URLSearchParams();
        if (input.event.inputConfig.incident_id !== undefined) {
          queryParams.append("incident_id", String(input.event.inputConfig.incident_id));
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
            "incident_relationships": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "id": {
                                    "type": "string"
                              },
                              "incident": {
                                    "type": "object",
                                    "properties": {
                                          "external_id": {
                                                "type": "number"
                                          },
                                          "id": {
                                                "type": "string"
                                          },
                                          "name": {
                                                "type": "string"
                                          }
                                    },
                                    "required": [
                                          "id",
                                          "name",
                                          "external_id"
                                    ]
                              }
                        },
                        "required": [
                              "id",
                              "incident"
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
            "incident_relationships"
      ]
},
    },
  },
};

export default incidentRelationshipsV1_List;
