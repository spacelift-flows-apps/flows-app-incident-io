import { AppBlock, events } from "@slflows/sdk/v1";

const privateIncidentMembershipRevokedV1Subscription: AppBlock = {
  name: "Private Incident - Membership Revoked V1",
  description: `This webhook is emitted whenever a user's access to a private incident is revoked.`,
  category: "Webhooks",

  async onInternalMessage(input) {
    const event = input.message.body;

    // Check if this is the right event type for this subscription
    if (event && event.event_type === "private_incident.membership_revoked_v1") {
      console.log("Received private_incident.membership_revoked_v1 webhook event");
      await events.emit(event);
    } else {
      console.warn(
        "privateIncidentMembershipRevokedV1Subscription received unexpected event type:",
        event?.event_type
      );
    }
  },

  outputs: {
    default: {
      name: "Event",
      description: "Emitted when a private_incident.membership_revoked_v1 webhook is received",
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
            "private_incident.membership_revoked_v1": {
                  "type": "object",
                  "properties": {
                        "actor_user_id": {
                              "type": "string"
                        },
                        "incident_id": {
                              "type": "string"
                        },
                        "user_id": {
                              "type": "string"
                        }
                  },
                  "required": [
                        "incident_id",
                        "user_id"
                  ]
            }
      },
      "required": [
            "event_type",
            "private_incident.membership_revoked_v1"
      ]
},
    },
  },
};

export default privateIncidentMembershipRevokedV1Subscription;
