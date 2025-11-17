import { AppBlock, events } from "@slflows/sdk/v1";

const schedulesV2_CreateOverride: AppBlock = {
  name: "CreateOverride Schedules V2",
  description: `Create a new schedule override.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "end_at": {
            "name": "End At",
            "description": "End time of the override",
            "type": "string",
            "required": false
      },
      "layer_id": {
            "name": "Layer Id",
            "description": "The layer this override applies to",
            "type": "string",
            "required": false
      },
      "rotation_id": {
            "name": "Rotation Id",
            "description": "The rotation this override applies to",
            "type": "string",
            "required": false
      },
      "schedule_id": {
            "name": "Schedule Id",
            "description": "The schedule this override applies to",
            "type": "string",
            "required": false
      },
      "start_at": {
            "name": "Start At",
            "description": "Start time of the override",
            "type": "string",
            "required": false
      },
      "user": {
            "name": "User",
            "description": "Request body field: user",
            "type": {
                  "type": "object",
                  "properties": {
                        "email": {
                              "type": "string"
                        },
                        "id": {
                              "type": "string"
                        },
                        "slack_user_id": {
                              "type": "string"
                        }
                  },
                  "additionalProperties": true
            },
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/schedule_overrides";
        const body: Record<string, any> = {};
        if (input.event.inputConfig.end_at !== undefined) {
          body.end_at = input.event.inputConfig.end_at;
        }
        if (input.event.inputConfig.layer_id !== undefined) {
          body.layer_id = input.event.inputConfig.layer_id;
        }
        if (input.event.inputConfig.rotation_id !== undefined) {
          body.rotation_id = input.event.inputConfig.rotation_id;
        }
        if (input.event.inputConfig.schedule_id !== undefined) {
          body.schedule_id = input.event.inputConfig.schedule_id;
        }
        if (input.event.inputConfig.start_at !== undefined) {
          body.start_at = input.event.inputConfig.start_at;
        }
        if (input.event.inputConfig.user !== undefined) {
          body.user = input.event.inputConfig.user;
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
            "override": {
                  "type": "object",
                  "properties": {
                        "created_at": {
                              "type": "string"
                        },
                        "end_at": {
                              "type": "string"
                        },
                        "id": {
                              "type": "string"
                        },
                        "layer_id": {
                              "type": "string"
                        },
                        "rotation_id": {
                              "type": "string"
                        },
                        "schedule_id": {
                              "type": "string"
                        },
                        "start_at": {
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
                        "schedule_id",
                        "rotation_id",
                        "layer_id",
                        "start_at",
                        "end_at",
                        "created_at",
                        "updated_at",
                        "user_id"
                  ]
            }
      },
      "required": [
            "override"
      ]
},
    },
  },
};

export default schedulesV2_CreateOverride;
