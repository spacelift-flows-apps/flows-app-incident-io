import { AppBlock, events } from "@slflows/sdk/v1";

const incidentRolesV2_Update: AppBlock = {
  name: "Update Incident Roles V2",
  description: `Update an existing incident role`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "Unique identifier for the role",
            "type": "string",
            "required": true
      },
      "description": {
            "name": "Description",
            "description": "Describes the purpose of the role",
            "type": "string",
            "required": false
      },
      "instructions": {
            "name": "Instructions",
            "description": "Provided to whoever is nominated for the role. Note that this will be empty for the 'reporter' role.",
            "type": "string",
            "required": false
      },
      "name": {
            "name": "Name",
            "description": "Human readable name of the incident role",
            "type": "string",
            "required": false
      },
      "shortform": {
            "name": "Shortform",
            "description": "Short human readable name for Slack. Note that this will be empty for the 'reporter' role.",
            "type": "string",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/incident_roles/{id}";
        url = url.replace("{id}", encodeURIComponent(String(input.event.inputConfig.id)));
        const body: Record<string, any> = {};
        if (input.event.inputConfig.description !== undefined) {
          body.description = input.event.inputConfig.description;
        }
        if (input.event.inputConfig.instructions !== undefined) {
          body.instructions = input.event.inputConfig.instructions;
        }
        if (input.event.inputConfig.name !== undefined) {
          body.name = input.event.inputConfig.name;
        }
        if (input.event.inputConfig.shortform !== undefined) {
          body.shortform = input.event.inputConfig.shortform;
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
            "incident_role": {
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
      },
      "required": [
            "incident_role"
      ]
},
    },
  },
};

export default incidentRolesV2_Update;
