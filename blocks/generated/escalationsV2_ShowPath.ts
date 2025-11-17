import { AppBlock, events } from "@slflows/sdk/v1";

const escalationsV2_ShowPath: AppBlock = {
  name: "ShowPath Escalations V2",
  description: `Show an escalation path.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "Unique identifier for this escalation path.",
            "type": "string",
            "required": true
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/escalation_paths/{id}";
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

export default escalationsV2_ShowPath;
