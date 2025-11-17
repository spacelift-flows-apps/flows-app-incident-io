import { AppBlock, events } from "@slflows/sdk/v1";

const incidentsV2_Create: AppBlock = {
  name: "Create Incidents V2",
  description: `Create a new incident.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "custom_field_entries": {
            "name": "Custom Field Entries",
            "description": "Set the incident's custom fields to these values",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "custom_field_id": {
                                    "type": "string"
                              },
                              "values": {
                                    "type": "array",
                                    "items": {
                                          "type": "object",
                                          "additionalProperties": true
                                    }
                              }
                        },
                        "required": [
                              "custom_field_id",
                              "values"
                        ]
                  }
            },
            "required": false
      },
      "idempotency_key": {
            "name": "Idempotency Key",
            "description": "Unique string used to de-duplicate incident create requests",
            "type": "string",
            "required": false
      },
      "incident_role_assignments": {
            "name": "Incident Role Assignments",
            "description": "Assign incident roles to these people",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "assignee": {
                                    "type": "object",
                                    "additionalProperties": true
                              },
                              "incident_role_id": {
                                    "type": "string"
                              }
                        },
                        "required": [
                              "incident_role_id"
                        ]
                  }
            },
            "required": false
      },
      "incident_status_id": {
            "name": "Incident Status Id",
            "description": "Incident status to assign to the incident",
            "type": "string",
            "required": false
      },
      "incident_timestamp_values": {
            "name": "Incident Timestamp Values",
            "description": "Assign the incident's timestamps to these values",
            "type": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "incident_timestamp_id": {
                                    "type": "string"
                              },
                              "value": {
                                    "type": "string"
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
            "required": false
      },
      "incident_type_id": {
            "name": "Incident Type Id",
            "description": "Incident type to create this incident as",
            "type": "string",
            "required": false
      },
      "mode": {
            "name": "Mode",
            "description": "Whether the incident is real, a test, a tutorial, or importing as a retrospective incident",
            "type": "string",
            "required": false
      },
      "name": {
            "name": "Name",
            "description": "Explanation of the incident",
            "type": "string",
            "required": false
      },
      "retrospective_incident_options": {
            "name": "Retrospective Incident Options",
            "description": "Request body field: retrospective_incident_options",
            "type": {
                  "type": "object",
                  "properties": {
                        "external_id": {
                              "type": "number"
                        },
                        "postmortem_document_url": {
                              "type": "string"
                        },
                        "slack_channel_id": {
                              "type": "string"
                        }
                  },
                  "additionalProperties": true
            },
            "required": false
      },
      "severity_id": {
            "name": "Severity Id",
            "description": "Severity to create incident as",
            "type": "string",
            "required": false
      },
      "slack_channel_name_override": {
            "name": "Slack Channel Name Override",
            "description": "Name of the Slack channel to create for this incident",
            "type": "string",
            "required": false
      },
      "slack_team_id": {
            "name": "Slack Team Id",
            "description": "Slack Team to create the incident in",
            "type": "string",
            "required": false
      },
      "summary": {
            "name": "Summary",
            "description": "Detailed description of the incident",
            "type": "string",
            "required": false
      },
      "visibility": {
            "name": "Visibility",
            "description": "Whether the incident should be open to anyone in your Slack workspace (public), or invite-only (private). For more information on Private Incidents see our [help centre](https://help.incident.io/articles/5905558102-can-we-mark-incidents-as-sensitive-and-restrict-access).",
            "type": "string",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/incidents";
        const body: Record<string, any> = {};
        if (input.event.inputConfig.custom_field_entries !== undefined) {
          body.custom_field_entries = input.event.inputConfig.custom_field_entries;
        }
        if (input.event.inputConfig.idempotency_key !== undefined) {
          body.idempotency_key = input.event.inputConfig.idempotency_key;
        }
        if (input.event.inputConfig.incident_role_assignments !== undefined) {
          body.incident_role_assignments = input.event.inputConfig.incident_role_assignments;
        }
        if (input.event.inputConfig.incident_status_id !== undefined) {
          body.incident_status_id = input.event.inputConfig.incident_status_id;
        }
        if (input.event.inputConfig.incident_timestamp_values !== undefined) {
          body.incident_timestamp_values = input.event.inputConfig.incident_timestamp_values;
        }
        if (input.event.inputConfig.incident_type_id !== undefined) {
          body.incident_type_id = input.event.inputConfig.incident_type_id;
        }
        if (input.event.inputConfig.mode !== undefined) {
          body.mode = input.event.inputConfig.mode;
        }
        if (input.event.inputConfig.name !== undefined) {
          body.name = input.event.inputConfig.name;
        }
        if (input.event.inputConfig.retrospective_incident_options !== undefined) {
          body.retrospective_incident_options = input.event.inputConfig.retrospective_incident_options;
        }
        if (input.event.inputConfig.severity_id !== undefined) {
          body.severity_id = input.event.inputConfig.severity_id;
        }
        if (input.event.inputConfig.slack_channel_name_override !== undefined) {
          body.slack_channel_name_override = input.event.inputConfig.slack_channel_name_override;
        }
        if (input.event.inputConfig.slack_team_id !== undefined) {
          body.slack_team_id = input.event.inputConfig.slack_team_id;
        }
        if (input.event.inputConfig.summary !== undefined) {
          body.summary = input.event.inputConfig.summary;
        }
        if (input.event.inputConfig.visibility !== undefined) {
          body.visibility = input.event.inputConfig.visibility;
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

export default incidentsV2_Create;
