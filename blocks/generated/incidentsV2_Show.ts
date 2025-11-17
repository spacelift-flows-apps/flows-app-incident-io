import { AppBlock, events } from "@slflows/sdk/v1";

const incidentsV2_Show: AppBlock = {
  name: "Show Incidents V2",
  description: `Get a single incident.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "Unique identifier for the incident",
            "type": "string",
            "required": true
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/incidents/{id}";
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
            "incident": {
                  "type": "object",
                  "properties": {
                        "call_url": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "created_at": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "creator": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "custom_field_entries": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "duration_metrics": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "external_issue_reference": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "has_debrief": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "incident_role_assignments": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "incident_status": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "incident_timestamp_values": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "incident_type": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "mode": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "name": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "permalink": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "postmortem_document_url": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "reference": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "severity": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "slack_channel_id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "slack_channel_name": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "slack_team_id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "summary": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "updated_at": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "visibility": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "workload_minutes_late": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "workload_minutes_sleeping": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "workload_minutes_total": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "workload_minutes_working": {
                              "type": "object",
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "incident_status",
                        "id",
                        "external_id",
                        "reference",
                        "name",
                        "idempotency_key",
                        "did_opt_out_of_post_incident_flow",
                        "visibility",
                        "mode",
                        "organisation_id",
                        "creator",
                        "last_activity_at",
                        "incident_role_assignments",
                        "custom_field_entries",
                        "slack_team_id",
                        "slack_channel_id",
                        "postmortem_status",
                        "created_at",
                        "updated_at",
                        "reported_at"
                  ]
            }
      },
      "required": [
            "incident"
      ]
},
    },
  },
};

export default incidentsV2_Show;
