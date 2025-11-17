import { AppBlock, events } from "@slflows/sdk/v1";

const publicIncidentFollowUpUpdatedV1Subscription: AppBlock = {
  name: "Public Incident - Follow Up Updated V1",
  description: `This webhook is emitted whenever a follow-up is updated.`,
  category: "Webhooks",

  async onInternalMessage(input) {
    const event = input.message.body;

    // Check if this is the right event type for this subscription
    if (event && event.event_type === "public_incident.follow_up_updated_v1") {
      console.log("Received public_incident.follow_up_updated_v1 webhook event");
      await events.emit(event);
    } else {
      console.warn(
        "publicIncidentFollowUpUpdatedV1Subscription received unexpected event type:",
        event?.event_type
      );
    }
  },

  outputs: {
    default: {
      name: "Event",
      description: "Emitted when a public_incident.follow_up_updated_v1 webhook is received",
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
            "public_incident.follow_up_updated_v1": {
                  "type": "object",
                  "properties": {
                        "assignee": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "completed_at": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "created_at": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "description": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "external_issue_reference": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "follow_up": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "incident_id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "status": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "updated_at": {
                              "type": "object",
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "id",
                        "incident_id",
                        "status",
                        "follow_up",
                        "created_at",
                        "updated_at"
                  ]
            }
      },
      "required": [
            "event_type",
            "public_incident.follow_up_updated_v1"
      ]
},
    },
  },
};

export default publicIncidentFollowUpUpdatedV1Subscription;
