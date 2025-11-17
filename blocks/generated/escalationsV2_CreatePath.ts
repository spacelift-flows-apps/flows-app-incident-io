import { AppBlock, events } from "@slflows/sdk/v1";

const escalationsV2_CreatePath: AppBlock = {
  name: "CreatePath Escalations V2",
  description: `Create an escalation path.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "name": {
            "name": "Name",
            "description": "The name of this escalation path, for the user's reference.",
            "type": "string",
            "required": false
      },
      "path": {
            "name": "Path",
            "description": "The nodes that form the levels and branches of this escalation path.",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "id": {
                                    "type": "string"
                              },
                              "if_else": {
                                    "type": "object",
                                    "additionalProperties": true
                              },
                              "level": {
                                    "type": "object",
                                    "additionalProperties": true
                              },
                              "notify_channel": {
                                    "type": "object",
                                    "additionalProperties": true
                              },
                              "repeat": {
                                    "type": "object",
                                    "additionalProperties": true
                              },
                              "type": {
                                    "type": "string",
                                    "enum": [
                                          "if_else",
                                          "repeat",
                                          "level",
                                          "notify_channel"
                                    ]
                              }
                        },
                        "required": [
                              "id",
                              "type"
                        ]
                  }
            },
            "required": false
      },
      "team_ids": {
            "name": "Team Ids",
            "description": "IDs of the teams that own this escalation path. This will automatically sync escalation paths with the right teams in Catalog. If you have an escalation paths attribute on your Teams, this attribute is required.",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "string"
                  }
            },
            "required": false
      },
      "working_hours": {
            "name": "Working Hours",
            "description": "The working hours for this escalation path.",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "id": {
                                    "type": "string"
                              },
                              "name": {
                                    "type": "string"
                              },
                              "timezone": {
                                    "type": "string"
                              },
                              "weekday_intervals": {
                                    "type": "array",
                                    "items": {
                                          "type": "object",
                                          "additionalProperties": true
                                    }
                              }
                        },
                        "required": [
                              "id",
                              "name",
                              "timezone",
                              "weekday_intervals"
                        ]
                  }
            },
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/escalation_paths";
        const body: Record<string, any> = {};
        if (input.event.inputConfig.name !== undefined) {
          body.name = input.event.inputConfig.name;
        }
        if (input.event.inputConfig.path !== undefined) {
          body.path = input.event.inputConfig.path;
        }
        if (input.event.inputConfig.team_ids !== undefined) {
          body.team_ids = input.event.inputConfig.team_ids;
        }
        if (input.event.inputConfig.working_hours !== undefined) {
          body.working_hours = input.event.inputConfig.working_hours;
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
            "escalation_path": {
                  "type": "object",
                  "properties": {
                        "id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "name": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "path": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "team_ids": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "working_hours": {
                              "type": "object",
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "id",
                        "name",
                        "path",
                        "levels",
                        "repeat_times",
                        "team_ids"
                  ]
            }
      },
      "required": [
            "escalation_path"
      ]
},
    },
  },
};

export default escalationsV2_CreatePath;
