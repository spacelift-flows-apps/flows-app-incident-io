import { AppBlock, events } from "@slflows/sdk/v1";

const incidentsV2_Edit: AppBlock = {
  name: "Edit Incidents V2",
  description: `Edit an existing incident.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "The unique identifier of the incident that you want to edit",
            "type": "string",
            "required": true
      },
      "incident": {
            "name": "Incident",
            "description": "Request body field: incident",
            "type": {
                  "type": "object",
                  "properties": {
                        "call_url": {
                              "type": "string"
                        },
                        "custom_field_entries": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "custom_field_id": {
                                                "type": "object",
                                                "additionalProperties": true
                                          },
                                          "values": {
                                                "type": "object",
                                                "additionalProperties": true
                                          }
                                    },
                                    "required": [
                                          "custom_field_id",
                                          "values"
                                    ]
                              }
                        },
                        "incident_role_assignments": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "assignee": {
                                                "type": "object",
                                                "additionalProperties": true
                                          },
                                          "incident_role_id": {
                                                "type": "object",
                                                "additionalProperties": true
                                          }
                                    },
                                    "required": [
                                          "incident_role_id"
                                    ]
                              }
                        },
                        "incident_status_id": {
                              "type": "string"
                        },
                        "incident_timestamp_values": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "incident_timestamp_id": {
                                                "type": "object",
                                                "additionalProperties": true
                                          },
                                          "value": {
                                                "type": "object",
                                                "additionalProperties": true
                                          }
                                    },
                                    "required": [
                                          "incident_timestamp_id",
                                          "id",
                                          "incident_id",
                                          "created_at"
                                    ]
                              }
                        },
                        "name": {
                              "type": "string"
                        },
                        "severity_id": {
                              "type": "string"
                        },
                        "slack_channel_name_override": {
                              "type": "string"
                        },
                        "summary": {
                              "type": "string"
                        }
                  },
                  "additionalProperties": true
            },
            "required": false
      },
      "notify_incident_channel": {
            "name": "Notify Incident Channel",
            "description": "Should we send Slack channel notifications to inform responders of this update? Note that this won't work if the Slack channel has already been archived.",
            "type": "boolean",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/incidents/{id}/actions/edit";
        url = url.replace("{id}", encodeURIComponent(String(input.event.inputConfig.id)));
        const body: Record<string, any> = {};
        if (input.event.inputConfig.incident !== undefined) {
          body.incident = input.event.inputConfig.incident;
        }
        if (input.event.inputConfig.notify_incident_channel !== undefined) {
          body.notify_incident_channel = input.event.inputConfig.notify_incident_channel;
        }
        const headers: Record<string, string> = {};

        const response = await fetch(url, {
          method: "POST",
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

export default incidentsV2_Edit;
