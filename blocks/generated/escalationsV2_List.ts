import { AppBlock, events } from "@slflows/sdk/v1";

const escalationsV2_List: AppBlock = {
  name: "List Escalations V2",
  description: `List all escalations for your account.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "page_size": {
            "name": "Page Size",
            "description": "Number of escalations to return per page",
            "type": "number",
            "required": false
      },
      "after": {
            "name": "After",
            "description": "An escalation's ID. This endpoint will return a list of escalations after this ID in relation to the API response order.",
            "type": "string",
            "required": false
      },
      "escalation_path": {
            "name": "Escalation Path",
            "description": "Filter on the escalation path for which the escalation was triggered. Accepted operators are 'one_of' and 'not_in'.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "status": {
            "name": "Status",
            "description": "Filter on the status of the escalation. Accepted operators are 'one_of' and 'not_in'.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "alert": {
            "name": "Alert",
            "description": "Filter on the alert that created an escalation. Accepted operators are 'one_of' and 'not_in'.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "created_at": {
            "name": "Created At",
            "description": "Filter on the created_at timestamp of the escalation. Accepted operators are 'gte', 'lte' and 'date_range'.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "updated_at": {
            "name": "Updated At",
            "description": "Filter on the updated_at timestamp of the escalation. Accepted operators are 'gte', 'lte' and 'date_range'.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/escalations";
        const queryParams = new URLSearchParams();
        if (input.event.inputConfig.page_size !== undefined) {
          queryParams.append("page_size", String(input.event.inputConfig.page_size));
        }
        if (input.event.inputConfig.after !== undefined) {
          queryParams.append("after", String(input.event.inputConfig.after));
        }
        if (input.event.inputConfig.escalation_path !== undefined) {
          queryParams.append("escalation_path", String(input.event.inputConfig.escalation_path));
        }
        if (input.event.inputConfig.status !== undefined) {
          queryParams.append("status", String(input.event.inputConfig.status));
        }
        if (input.event.inputConfig.alert !== undefined) {
          queryParams.append("alert", String(input.event.inputConfig.alert));
        }
        if (input.event.inputConfig.created_at !== undefined) {
          queryParams.append("created_at", String(input.event.inputConfig.created_at));
        }
        if (input.event.inputConfig.updated_at !== undefined) {
          queryParams.append("updated_at", String(input.event.inputConfig.updated_at));
        }
        if (queryParams.toString()) url += "?" + queryParams.toString();
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
            "escalations": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "additionalProperties": true
                  }
            },
            "pagination_meta": {
                  "type": "object",
                  "properties": {
                        "after": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "page_size": {
                              "type": "object",
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "page_size"
                  ]
            }
      },
      "required": [
            "escalations",
            "pagination_meta"
      ]
},
    },
  },
};

export default escalationsV2_List;
