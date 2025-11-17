import { AppBlock, events } from "@slflows/sdk/v1";

const escalationsV2_Show: AppBlock = {
  name: "Show Escalations V2",
  description: `Show a specific escalation.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "Unique ID of the escalation",
            "type": "string",
            "required": true
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/escalations/{id}";
        url = url.replace("{id}", encodeURIComponent(String(input.event.inputConfig.id)));
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

export default escalationsV2_Show;
