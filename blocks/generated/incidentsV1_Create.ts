import { AppBlock, events } from "@slflows/sdk/v1";

const incidentsV1_Create: AppBlock = {
  name: "Create Incidents V1",
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
                              "incident_role_id",
                              "assignee"
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
            "description": "Whether the incident is real or test",
            "type": "string",
            "required": false
      },
      "name": {
            "name": "Name",
            "description": "Explanation of the incident",
            "type": "string",
            "required": false
      },
      "severity_id": {
            "name": "Severity Id",
            "description": "Severity to create incident as",
            "type": "string",
            "required": false
      },
      "slack_team_id": {
            "name": "Slack Team Id",
            "description": "ID of the Slack team / workspace. This is only required if you are using a Slack Enterprise Grid with multiple teams.",
            "type": "string",
            "required": false
      },
      "source_message_channel_id": {
            "name": "Source Message Channel Id",
            "description": "Channel ID of the source message, if this incident was created from one",
            "type": "string",
            "required": false
      },
      "source_message_timestamp": {
            "name": "Source Message Timestamp",
            "description": "Timestamp of the source message, if this incident was created from one",
            "type": "string",
            "required": false
      },
      "status": {
            "name": "Status",
            "description": "Current status of the incident",
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

        let url = "https://api.incident.io/v1/incidents";
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
        if (input.event.inputConfig.incident_type_id !== undefined) {
          body.incident_type_id = input.event.inputConfig.incident_type_id;
        }
        if (input.event.inputConfig.mode !== undefined) {
          body.mode = input.event.inputConfig.mode;
        }
        if (input.event.inputConfig.name !== undefined) {
          body.name = input.event.inputConfig.name;
        }
        if (input.event.inputConfig.severity_id !== undefined) {
          body.severity_id = input.event.inputConfig.severity_id;
        }
        if (input.event.inputConfig.slack_team_id !== undefined) {
          body.slack_team_id = input.event.inputConfig.slack_team_id;
        }
        if (input.event.inputConfig.source_message_channel_id !== undefined) {
          body.source_message_channel_id = input.event.inputConfig.source_message_channel_id;
        }
        if (input.event.inputConfig.source_message_timestamp !== undefined) {
          body.source_message_timestamp = input.event.inputConfig.source_message_timestamp;
        }
        if (input.event.inputConfig.status !== undefined) {
          body.status = input.event.inputConfig.status;
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
                        "id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "incident_role_assignments": {
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
                        "status": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "summary": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "timestamps": {
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
                        }
                  },
                  "required": [
                        "status",
                        "id",
                        "external_id",
                        "reference",
                        "name",
                        "incident_status",
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

export default incidentsV1_Create;
