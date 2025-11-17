import { AppBlock, events } from "@slflows/sdk/v1";

const escalationsV2_Create: AppBlock = {
  name: "Create Escalations V2",
  description: `Create an escalation.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "description": {
            "name": "Description",
            "description": "Additional details about the escalation",
            "type": "string",
            "required": false
      },
      "escalation_path_id": {
            "name": "Escalation Path Id",
            "description": "ID of the escalation path to follow",
            "type": "string",
            "required": false
      },
      "idempotency_key": {
            "name": "Idempotency Key",
            "description": "Unique key to prevent duplicate escalations. If this key has already been used, the existing escalation will be returned.",
            "type": "string",
            "required": false
      },
      "title": {
            "name": "Title",
            "description": "The title of the escalation. This message will be included in all notifications about this escalation.",
            "type": "string",
            "required": false
      },
      "user_ids": {
            "name": "User Ids",
            "description": "IDs of users to escalate directly to",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "string"
                  }
            },
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/escalations";
        const body: Record<string, any> = {};
        if (input.event.inputConfig.description !== undefined) {
          body.description = input.event.inputConfig.description;
        }
        if (input.event.inputConfig.escalation_path_id !== undefined) {
          body.escalation_path_id = input.event.inputConfig.escalation_path_id;
        }
        if (input.event.inputConfig.idempotency_key !== undefined) {
          body.idempotency_key = input.event.inputConfig.idempotency_key;
        }
        if (input.event.inputConfig.title !== undefined) {
          body.title = input.event.inputConfig.title;
        }
        if (input.event.inputConfig.user_ids !== undefined) {
          body.user_ids = input.event.inputConfig.user_ids;
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
            "escalation": {
                  "type": "object",
                  "properties": {
                        "created_at": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "creator": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "escalation_path_id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "events": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "priority": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "related_alerts": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "related_incidents": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "status": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "title": {
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
                        "created_at",
                        "updated_at",
                        "status",
                        "title",
                        "priority",
                        "creator",
                        "events",
                        "related_incidents",
                        "related_alerts"
                  ]
            }
      },
      "required": [
            "escalation"
      ]
},
    },
  },
};

export default escalationsV2_Create;
