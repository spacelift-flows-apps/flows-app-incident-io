import { AppBlock, events } from "@slflows/sdk/v1";

const alertSourcesV2_Show: AppBlock = {
  name: "Show Alert Sources V2",
  description: `Load details about a specific alert source in your account.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "The ID of this alert source",
            "type": "string",
            "required": true
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/alert_sources/{id}";
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
            "alert_source": {
                  "type": "object",
                  "properties": {
                        "email_options": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "http_custom_options": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "jira_options": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "name": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "secret_token": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "source_type": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "template": {
                              "type": "object",
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "id",
                        "organisation_id",
                        "state",
                        "name",
                        "source_type",
                        "template",
                        "alert_source",
                        "created_at",
                        "updated_at",
                        "alert_route_ids",
                        "auto_ack_in_source",
                        "missing_required_attributes"
                  ]
            }
      },
      "required": [
            "alert_source"
      ]
},
    },
  },
};

export default alertSourcesV2_Show;
