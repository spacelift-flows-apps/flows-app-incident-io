import { AppBlock, events } from "@slflows/sdk/v1";

const incidentRolesV2_List: AppBlock = {
  name: "List Incident Roles V2",
  description: `List all incident roles for an organisation.`,
  category: "API",

  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/incident_roles";
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
            "incident_roles": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "created_at": {
                                    "type": "string"
                              },
                              "description": {
                                    "type": "string"
                              },
                              "id": {
                                    "type": "string"
                              },
                              "instructions": {
                                    "type": "string"
                              },
                              "name": {
                                    "type": "string"
                              },
                              "role_type": {
                                    "type": "string",
                                    "enum": [
                                          "lead",
                                          "reporter",
                                          "custom"
                                    ]
                              },
                              "shortform": {
                                    "type": "string"
                              },
                              "updated_at": {
                                    "type": "string"
                              }
                        },
                        "required": [
                              "name",
                              "shortform",
                              "description",
                              "instructions",
                              "condition_groups",
                              "id",
                              "role_type",
                              "created_at",
                              "updated_at"
                        ]
                  }
            }
      },
      "required": [
            "incident_roles"
      ]
},
    },
  },
};

export default incidentRolesV2_List;
