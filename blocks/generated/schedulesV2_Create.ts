import { AppBlock, events } from "@slflows/sdk/v1";

const schedulesV2_Create: AppBlock = {
  name: "Create Schedules V2",
  description: `Create a new schedule.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "schedule": {
            "name": "Schedule",
            "description": "Request body field: schedule",
            "type": {
                  "type": "object",
                  "properties": {
                        "annotations": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "config": {
                              "type": "object",
                              "properties": {
                                    "rotations": {
                                          "type": "array",
                                          "items": {
                                                "type": "object",
                                                "additionalProperties": true
                                          }
                                    }
                              },
                              "additionalProperties": true
                        },
                        "holidays_public_config": {
                              "type": "object",
                              "properties": {
                                    "country_codes": {
                                          "type": "array",
                                          "items": {
                                                "type": "object",
                                                "additionalProperties": true
                                          }
                                    }
                              },
                              "required": [
                                    "country_codes"
                              ]
                        },
                        "name": {
                              "type": "string"
                        },
                        "team_ids": {
                              "type": "array",
                              "items": {
                                    "type": "string"
                              }
                        },
                        "timezone": {
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

        let url = "https://api.incident.io/v2/schedules";
        const body: Record<string, any> = {};
        if (input.event.inputConfig.schedule !== undefined) {
          body.schedule = input.event.inputConfig.schedule;
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
            "schedule": {
                  "type": "object",
                  "properties": {
                        "annotations": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "config": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "created_at": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "current_shifts": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "holidays_public_config": {
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
                        "team_ids": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "timezone": {
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
                        "timezone",
                        "external_provider",
                        "external_provider_id",
                        "team_ids",
                        "created_at",
                        "updated_at",
                        "annotations",
                        "managed_by"
                  ]
            }
      },
      "required": [
            "schedule"
      ]
},
    },
  },
};

export default schedulesV2_Create;
