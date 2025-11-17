import { AppBlock, events } from "@slflows/sdk/v1";

const severitiesV1_Update: AppBlock = {
  name: "Update Severities V1",
  description: `Update an existing severity`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "Unique identifier of the severity",
            "type": "string",
            "required": true
      },
      "description": {
            "name": "Description",
            "description": "Description of the severity",
            "type": "string",
            "required": false
      },
      "name": {
            "name": "Name",
            "description": "Human readable name of the severity",
            "type": "string",
            "required": false
      },
      "rank": {
            "name": "Rank",
            "description": "Rank to help sort severities (lower numbers are less severe)",
            "type": "number",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v1/severities/{id}";
        url = url.replace("{id}", encodeURIComponent(String(input.event.inputConfig.id)));
        const body: Record<string, any> = {};
        if (input.event.inputConfig.description !== undefined) {
          body.description = input.event.inputConfig.description;
        }
        if (input.event.inputConfig.name !== undefined) {
          body.name = input.event.inputConfig.name;
        }
        if (input.event.inputConfig.rank !== undefined) {
          body.rank = input.event.inputConfig.rank;
        }
        const headers: Record<string, string> = {};

        const response = await fetch(url, {
          method: "PUT",
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
            "severity": {
                  "type": "object",
                  "properties": {
                        "created_at": {
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
                        "name": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "rank": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "updated_at": {
                              "type": "object",
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "rank",
                        "created_at",
                        "updated_at",
                        "id",
                        "name",
                        "description"
                  ]
            }
      },
      "required": [
            "severity"
      ]
},
    },
  },
};

export default severitiesV1_Update;
