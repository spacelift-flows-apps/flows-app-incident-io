import { AppBlock, events } from "@slflows/sdk/v1";

const incidentsV2_List: AppBlock = {
  name: "List Incidents V2",
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
            "description": "An incident's ID. This endpoint will return a list of incidents after this ID in relation to the API response order.",
            "type": "string",
            "required": false
      },
      "status": {
            "name": "Status",
            "description": "Filter on incident status. The accepted operators are 'one_of', or 'not_in'.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "status_category": {
            "name": "Status Category",
            "description": "Filter on the category of the incidents status. The accepted operators are 'one_of', or 'not_in'.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "created_at": {
            "name": "Created At",
            "description": "Filter on incident created at timestamp. The accepted operators are 'gte', 'lte' and 'date_range'.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "updated_at": {
            "name": "Updated At",
            "description": "Filter on incident updated at timestamp. The accepted operators are 'gte', 'lte' and 'date_range'.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "severity": {
            "name": "Severity",
            "description": "Filter on incident severity. The accepted operators are 'one_of', 'not_in', 'gte', 'lte'.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "incident_type": {
            "name": "Incident Type",
            "description": "Filter on incident type. The accepted operators are 'one_of, or 'not_in'.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "incident_role": {
            "name": "Incident Role",
            "description": "Filter on an incident role. Role ID should be sent, followed by the operator and values. The accepted operators are 'one_of', 'is_blank'.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "custom_field": {
            "name": "Custom Field",
            "description": "Filter on an incident custom field. Custom field ID should be sent, followed by the operator and values. Accepted operator will depend on the custom field type.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "mode": {
            "name": "Mode",
            "description": "Filter on incident mode. The accepted operator is 'one_of'.  If this is not provided, this value defaults to `{\"one_of\": [\"standard\", \"retrospective\"] }`, meaning that test and tutorial incidents are not included.",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/incidents";
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
        if (input.event.inputConfig.status_category !== undefined) {
          queryParams.append("status_category", String(input.event.inputConfig.status_category));
        }
        if (input.event.inputConfig.created_at !== undefined) {
          queryParams.append("created_at", String(input.event.inputConfig.created_at));
        }
        if (input.event.inputConfig.updated_at !== undefined) {
          queryParams.append("updated_at", String(input.event.inputConfig.updated_at));
        }
        if (input.event.inputConfig.severity !== undefined) {
          queryParams.append("severity", String(input.event.inputConfig.severity));
        }
        if (input.event.inputConfig.incident_type !== undefined) {
          queryParams.append("incident_type", String(input.event.inputConfig.incident_type));
        }
        if (input.event.inputConfig.incident_role !== undefined) {
          queryParams.append("incident_role", String(input.event.inputConfig.incident_role));
        }
        if (input.event.inputConfig.custom_field !== undefined) {
          queryParams.append("custom_field", String(input.event.inputConfig.custom_field));
        }
        if (input.event.inputConfig.mode !== undefined) {
          queryParams.append("mode", String(input.event.inputConfig.mode));
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

export default incidentsV2_List;
