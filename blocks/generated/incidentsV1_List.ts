import { AppBlock, events } from "@slflows/sdk/v1";

const incidentsV1_List: AppBlock = {
  name: "List Incidents V1",
  description: `List all incidents for an organisation.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "page_size": {
            "name": "Page Size",
            "description": "Integer number of records to return",
            "type": "number",
            "required": false
      },
      "after": {
            "name": "After",
            "description": "An record's ID. This endpoint will return a list of records after this ID in relation to the API response order.",
            "type": "string",
            "required": false
      },
      "status": {
            "name": "Status",
            "description": "Filter for incidents in these statuses",
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

        let url = "https://api.incident.io/v1/incidents";
        const queryParams = new URLSearchParams();
        if (input.event.inputConfig.page_size !== undefined) {
          queryParams.append("page_size", String(input.event.inputConfig.page_size));
        }
        if (input.event.inputConfig.after !== undefined) {
          queryParams.append("after", String(input.event.inputConfig.after));
        }
        if (input.event.inputConfig.status !== undefined) {
          queryParams.append("status", String(input.event.inputConfig.status));
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
            "incidents": {
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
                        },
                        "total_record_count": {
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
            "incidents"
      ]
},
    },
  },
};

export default incidentsV1_List;
