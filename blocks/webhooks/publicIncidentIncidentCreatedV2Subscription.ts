import { AppBlock, events } from "@slflows/sdk/v1";

const publicIncidentIncidentCreatedV2Subscription: AppBlock = {
  name: "Public Incident - Incident Created V2",
  description: `This webhook is emitted whenever a new incident is created.`,
  category: "Webhooks",

  async onInternalMessage(input) {
    const event = input.message.body;

    // Check if this is the right event type for this subscription
    if (event && event.event_type === "public_incident.incident_created_v2") {
      console.log("Received public_incident.incident_created_v2 webhook event");
      await events.emit(event);
    } else {
      console.warn(
        "publicIncidentIncidentCreatedV2Subscription received unexpected event type:",
        event?.event_type
      );
    }
  },

  outputs: {
    default: {
      name: "Event",
      description: "Emitted when a public_incident.incident_created_v2 webhook is received",
      default: true,
      type: {
      "type": "object",
      "properties": {
            "event_type": {
                  "type": "string",
                  "enum": [
                        "public_incident.incident_created_v2",
                        "private_incident.incident_created_v2",
                        "public_incident.incident_updated_v2",
                        "private_incident.incident_updated_v2",
                        "public_incident.incident_status_updated_v2",
                        "public_incident.follow_up_created_v1",
                        "private_incident.follow_up_created_v1",
                        "public_incident.follow_up_updated_v1",
                        "private_incident.follow_up_updated_v1",
                        "public_incident.follow_up_created_v2",
                        "private_incident.follow_up_created_v2",
                        "public_incident.follow_up_updated_v2",
                        "private_incident.follow_up_updated_v2",
                        "public_incident.action_created_v1",
                        "private_incident.action_created_v1",
                        "public_incident.action_updated_v1",
                        "private_incident.action_updated_v1",
                        "private_incident.membership_granted_v1",
                        "private_incident.membership_revoked_v1"
                  ]
            },
            "public_incident.incident_created_v2": {
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
                        "most_recent_update_message": {
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
                        "related_incidents": {
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
            "event_type",
            "public_incident.incident_created_v2"
      ]
},
    },
  },
};

export default publicIncidentIncidentCreatedV2Subscription;
