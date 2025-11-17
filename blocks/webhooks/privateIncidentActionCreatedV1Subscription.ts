import { AppBlock, events } from "@slflows/sdk/v1";

const privateIncidentActionCreatedV1Subscription: AppBlock = {
  name: "Private Incident - Action Created V1",
  description: `This webhook is emitted whenever a follow-up for a private incident is created.`,
  category: "Webhooks",

  async onInternalMessage(input) {
    const event = input.message.body;

    // Check if this is the right event type for this subscription
    if (event && event.event_type === "private_incident.action_created_v1") {
      console.log("Received private_incident.action_created_v1 webhook event");
      await events.emit(event);
    } else {
      console.warn(
        "privateIncidentActionCreatedV1Subscription received unexpected event type:",
        event?.event_type
      );
    }
  },

  outputs: {
    default: {
      name: "Event",
      description: "Emitted when a private_incident.action_created_v1 webhook is received",
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
            "private_incident.action_created_v1": {
                  "type": "object",
                  "properties": {
                        "id": {
                              "type": "string"
                        }
                  },
                  "required": [
                        "id"
                  ]
            }
      },
      "required": [
            "event_type",
            "private_incident.action_created_v1"
      ]
},
    },
  },
};

export default privateIncidentActionCreatedV1Subscription;
