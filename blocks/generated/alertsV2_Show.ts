import { AppBlock, events } from "@slflows/sdk/v1";

const alertsV2_Show: AppBlock = {
  name: "Show Alerts V2",
  description: `Show a single alert for your account`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "Unique identifier for the alert",
            "type": "string",
            "required": true
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/alerts/{id}";
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
            "alert": {
                  "type": "object",
                  "properties": {
                        "alert_source_id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "attributes": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "created_at": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "deduplication_key": {
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
                        "resolved_at": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "source_url": {
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
                        "alert_source_id",
                        "alert_source_config_id",
                        "source_type",
                        "deduplication_key",
                        "status",
                        "title",
                        "attribute_values",
                        "attributes",
                        "evaluation_failures",
                        "alert_source",
                        "created_at",
                        "updated_at",
                        "themes",
                        "can_resolve"
                  ]
            }
      },
      "required": [
            "alert"
      ]
},
    },
  },
};

export default alertsV2_Show;
