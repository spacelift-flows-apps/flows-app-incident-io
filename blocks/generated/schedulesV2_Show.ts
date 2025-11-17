import { AppBlock, events } from "@slflows/sdk/v1";

const schedulesV2_Show: AppBlock = {
  name: "Show Schedules V2",
  description: `Get a single schedule.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "Unique internal ID of the schedule",
            "type": "string",
            "required": true
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/schedules/{id}";
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

export default schedulesV2_Show;
