import { AppBlock, events } from "@slflows/sdk/v1";

const incidentRolesV1_Create: AppBlock = {
  name: "Create Incident Roles V1",
  description: `Create a new incident role`,
  category: "API",

  inputs: {
    default: {
      config: {
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
      "required": {
            "name": "Required",
            "description": "DEPRECATED: this will always be false.",
            "type": "boolean",
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

        let url = "https://api.incident.io/v1/incident_roles";
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
        if (input.event.inputConfig.required !== undefined) {
          body.required = input.event.inputConfig.required;
        }
        if (input.event.inputConfig.shortform !== undefined) {
          body.shortform = input.event.inputConfig.shortform;
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
            "incident_role": {
                  "type": "object",
                  "properties": {
                        "created_at": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "description": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "instructions": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "name": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "required": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "role_type": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "shortform": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "updated_at": {
                              "type": "object",
                              "additionalProperties": true
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

export default incidentRolesV1_Create;
