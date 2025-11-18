import { AppBlock, events } from "@slflows/sdk/v1";

const incidentMembershipsV1_Create: AppBlock = {
  name: "Create Incident Memberships V1",
  description: `Makes a user a member of a private incident`,
  category: "Incident Memberships V1",

  inputs: {
    default: {
      config: {
      "incident_id": {
            "name": "Incident Id",
            "description": "Request body field: incident_id",
            "type": "string",
            "required": false
      },
      "user_id": {
            "name": "User Id",
            "description": "Request body field: user_id",
            "type": "string",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v1/incident_memberships";
        const body: Record<string, any> = {};
        if (input.event.inputConfig.incident_id !== undefined) {
          body.incident_id = input.event.inputConfig.incident_id;
        }
        if (input.event.inputConfig.user_id !== undefined) {
          body.user_id = input.event.inputConfig.user_id;
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
            "incident_membership": {
                  "type": "object",
                  "properties": {
                        "created_at": {
                              "type": "string"
                        },
                        "id": {
                              "type": "string"
                        },
                        "incident_id": {
                              "type": "string"
                        },
                        "updated_at": {
                              "type": "string"
                        },
                        "user": {
                              "type": "object",
                              "properties": {
                                    "email": {
                                          "type": "string"
                                    },
                                    "id": {
                                          "type": "string"
                                    },
                                    "name": {
                                          "type": "string"
                                    },
                                    "role": {
                                          "type": "string",
                                          "enum": [
                                                "viewer",
                                                "responder",
                                                "administrator",
                                                "owner",
                                                "unset"
                                          ]
                                    },
                                    "slack_user_id": {
                                          "type": "string"
                                    }
                              },
                              "required": [
                                    "role",
                                    "id",
                                    "slack_role",
                                    "name",
                                    "deprecated_base_role",
                                    "organisation_id"
                              ]
                        }
                  },
                  "required": [
                        "id",
                        "organisation_id",
                        "user",
                        "incident_id",
                        "created_at",
                        "updated_at"
                  ]
            }
      },
      "required": [
            "incident_membership"
      ]
},
    },
  },
};

export default incidentMembershipsV1_Create;
