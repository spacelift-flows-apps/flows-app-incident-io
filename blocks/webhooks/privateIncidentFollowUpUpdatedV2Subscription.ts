import { AppBlock, events } from "@slflows/sdk/v1";

const privateIncidentFollowUpUpdatedV2Subscription: AppBlock = {
  name: "Private Incident - Follow Up Updated V2",
  description: `This webhook is emitted whenever a follow-up for a private incident is updated.`,
  category: "Webhooks",

  async onInternalMessage(input) {
    const event = input.message.body;

    // Check if this is the right event type for this subscription
    if (event && event.event_type === "private_incident.follow_up_updated_v2") {
      console.log("Received private_incident.follow_up_updated_v2 webhook event");
      await events.emit(event);
    } else {
      console.warn(
        "privateIncidentFollowUpUpdatedV2Subscription received unexpected event type:",
        event?.event_type
      );
    }
  },

  outputs: {
    default: {
      name: "Event",
      description: "Emitted when a private_incident.follow_up_updated_v2 webhook is received",
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
            "private_incident.follow_up_updated_v2": {
                  "type": "object",
                  "properties": {
                        "id": {
                              "type": "object",
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "id"
                  ]
            }
      },
      "required": [
            "event_type",
            "private_incident.follow_up_updated_v2"
      ]
},
    },
  },
};

export default privateIncidentFollowUpUpdatedV2Subscription;
