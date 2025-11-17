import { AppBlock, events } from "@slflows/sdk/v1";

const publicIncidentFollowUpUpdatedV2Subscription: AppBlock = {
  name: "Public Incident - Follow Up Updated V2",
  description: `This webhook is emitted whenever a follow-up is updated.`,
  category: "Webhooks",

  async onInternalMessage(input) {
    const event = input.message.body;

    // Check if this is the right event type for this subscription
    if (event && event.event_type === "public_incident.follow_up_updated_v2") {
      console.log("Received public_incident.follow_up_updated_v2 webhook event");
      await events.emit(event);
    } else {
      console.warn(
        "publicIncidentFollowUpUpdatedV2Subscription received unexpected event type:",
        event?.event_type
      );
    }
  },

  outputs: {
    default: {
      name: "Event",
      description: "Emitted when a public_incident.follow_up_updated_v2 webhook is received",
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
            "public_incident.follow_up_updated_v2": {
                  "type": "object",
                  "properties": {
                        "assignee": {
                              "type": "object",
                              "properties": {
                                    "email": {
                                          "type": "string"
                                    },
                                    "id": {
                                          "type": "string"
                                    },
                                    "name": {
                                          "type": "string"
                                    },
                                    "role": {
                                          "type": "string",
                                          "enum": [
                                                "viewer",
                                                "responder",
                                                "administrator",
                                                "owner",
                                                "unset"
                                          ]
                                    },
                                    "slack_user_id": {
                                          "type": "string"
                                    }
                              },
                              "required": [
                                    "role",
                                    "id",
                                    "slack_role",
                                    "name",
                                    "deprecated_base_role",
                                    "organisation_id"
                              ]
                        },
                        "completed_at": {
                              "type": "string"
                        },
                        "created_at": {
                              "type": "string"
                        },
                        "creator": {
                              "type": "object",
                              "properties": {
                                    "alert": {
                                          "type": "object",
                                          "properties": {
                                                "id": {
                                                      "type": "string"
                                                },
                                                "title": {
                                                      "type": "string"
                                                }
                                          },
                                          "required": [
                                                "id",
                                                "title",
                                                "deduplication_key",
                                                "alert_source_id",
                                                "source_type",
                                                "status",
                                                "created_at",
                                                "updated_at"
                                          ]
                                    },
                                    "api_key": {
                                          "type": "object",
                                          "properties": {
                                                "id": {
                                                      "type": "string"
                                                },
                                                "name": {
                                                      "type": "string"
                                                }
                                          },
                                          "required": [
                                                "id",
                                                "name",
                                                "roles",
                                                "created_by"
                                          ]
                                    },
                                    "user": {
                                          "type": "object",
                                          "properties": {
                                                "email": {
                                                      "type": "string"
                                                },
                                                "id": {
                                                      "type": "string"
                                                },
                                                "name": {
                                                      "type": "string"
                                                },
                                                "role": {
                                                      "type": "string",
                                                      "enum": [
                                                            "viewer",
                                                            "responder",
                                                            "administrator",
                                                            "owner",
                                                            "unset"
                                                      ]
                                                },
                                                "slack_user_id": {
                                                      "type": "string"
                                                }
                                          },
                                          "required": [
                                                "role",
                                                "id",
                                                "slack_role",
                                                "name",
                                                "deprecated_base_role",
                                                "organisation_id"
                                          ]
                                    },
                                    "workflow": {
                                          "type": "object",
                                          "properties": {
                                                "id": {
                                                      "type": "string"
                                                },
                                                "name": {
                                                      "type": "string"
                                                }
                                          },
                                          "required": [
                                                "id",
                                                "name",
                                                "organisation_id",
                                                "trigger",
                                                "once_for",
                                                "version",
                                                "expressions",
                                                "condition_groups",
                                                "steps",
                                                "include_private_incidents",
                                                "runs_on_incident_modes",
                                                "continue_on_step_error",
                                                "runs_on_incidents",
                                                "state"
                                          ]
                                    }
                              },
                              "additionalProperties": true
                        },
                        "description": {
                              "type": "string"
                        },
                        "external_issue_reference": {
                              "type": "object",
                              "properties": {
                                    "issue_name": {
                                          "type": "string"
                                    },
                                    "issue_permalink": {
                                          "type": "string"
                                    },
                                    "provider": {
                                          "type": "string",
                                          "enum": [
                                                "asana",
                                                "azure_devops",
                                                "click_up",
                                                "linear",
                                                "jira",
                                                "jira_server",
                                                "github",
                                                "gitlab",
                                                "service_now",
                                                "shortcut"
                                          ]
                                    }
                              },
                              "required": [
                                    "provider",
                                    "issue_name",
                                    "issue_permalink"
                              ]
                        },
                        "id": {
                              "type": "string"
                        },
                        "incident_id": {
                              "type": "string"
                        },
                        "labels": {
                              "type": "array",
                              "items": {
                                    "type": "string"
                              }
                        },
                        "priority": {
                              "type": "object",
                              "properties": {
                                    "description": {
                                          "type": "string"
                                    },
                                    "id": {
                                          "type": "string"
                                    },
                                    "name": {
                                          "type": "string"
                                    },
                                    "rank": {
                                          "type": "number"
                                    }
                              },
                              "required": [
                                    "id",
                                    "name",
                                    "rank"
                              ]
                        },
                        "status": {
                              "type": "string",
                              "enum": [
                                    "outstanding",
                                    "completed",
                                    "deleted",
                                    "not_doing"
                              ]
                        },
                        "title": {
                              "type": "string"
                        },
                        "updated_at": {
                              "type": "string"
                        }
                  },
                  "required": [
                        "id",
                        "incident_id",
                        "creator",
                        "title",
                        "status",
                        "labels",
                        "created_at",
                        "updated_at"
                  ]
            }
      },
      "required": [
            "event_type",
            "public_incident.follow_up_updated_v2"
      ]
},
    },
  },
};

export default publicIncidentFollowUpUpdatedV2Subscription;
