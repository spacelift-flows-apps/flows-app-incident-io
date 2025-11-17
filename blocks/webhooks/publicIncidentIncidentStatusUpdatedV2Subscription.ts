import { AppBlock, events } from "@slflows/sdk/v1";

const publicIncidentIncidentStatusUpdatedV2Subscription: AppBlock = {
  name: "Public Incident - Incident Status Updated V2",
  description: `This webhook is emitted whenever an incident's status changes.`,
  category: "Webhooks",

  async onInternalMessage(input) {
    const event = input.message.body;

    // Check if this is the right event type for this subscription
    if (event && event.event_type === "public_incident.incident_status_updated_v2") {
      console.log("Received public_incident.incident_status_updated_v2 webhook event");
      await events.emit(event);
    } else {
      console.warn(
        "publicIncidentIncidentStatusUpdatedV2Subscription received unexpected event type:",
        event?.event_type
      );
    }
  },

  outputs: {
    default: {
      name: "Event",
      description: "Emitted when a public_incident.incident_status_updated_v2 webhook is received",
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
            "public_incident.incident_status_updated_v2": {
                  "type": "object",
                  "properties": {
                        "incident": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "message": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "new_status": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "previous_status": {
                              "type": "object",
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "incident",
                        "previous_status",
                        "new_status"
                  ]
            }
      },
      "required": [
            "event_type",
            "public_incident.incident_status_updated_v2"
      ]
},
    },
  },
};

export default publicIncidentIncidentStatusUpdatedV2Subscription;
