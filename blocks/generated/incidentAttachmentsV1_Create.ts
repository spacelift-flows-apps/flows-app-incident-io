import { AppBlock, events } from "@slflows/sdk/v1";

const incidentAttachmentsV1_Create: AppBlock = {
  name: "Create Incident Attachments V1",
  description: `Attaches an external resource to an incident`,
  category: "API",

  inputs: {
    default: {
      config: {
      "incident_id": {
            "name": "Incident Id",
            "description": "ID of the incident to add an attachment to",
            "type": "string",
            "required": false
      },
      "resource": {
            "name": "Resource",
            "description": "Request body field: resource",
            "type": {
                  "type": "object",
                  "properties": {
                        "external_id": {
                              "type": "string"
                        },
                        "resource_type": {
                              "type": "string",
                              "enum": [
                                    "pager_duty_incident",
                                    "opsgenie_alert",
                                    "datadog_monitor_alert",
                                    "github_pull_request",
                                    "gitlab_merge_request",
                                    "sentry_issue",
                                    "jira_issue",
                                    "jsm_alert",
                                    "atlassian_statuspage_incident",
                                    "zendesk_ticket",
                                    "google_calendar_event",
                                    "outlook_calendar_event",
                                    "slack_file",
                                    "scrubbed",
                                    "statuspage_incident"
                              ]
                        }
                  },
                  "required": [
                        "id",
                        "permalink",
                        "external_id",
                        "title",
                        "resource_type",
                        "resource_type_label",
                        "created_at",
                        "updated_at"
                  ]
            },
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v1/incident_attachments";
        const body: Record<string, any> = {};
        if (input.event.inputConfig.incident_id !== undefined) {
          body.incident_id = input.event.inputConfig.incident_id;
        }
        if (input.event.inputConfig.resource !== undefined) {
          body.resource = input.event.inputConfig.resource;
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
            "incident_attachment": {
                  "type": "object",
                  "properties": {
                        "id": {
                              "type": "string"
                        },
                        "incident_id": {
                              "type": "string"
                        },
                        "resource": {
                              "type": "object",
                              "properties": {
                                    "external_id": {
                                          "type": "string"
                                    },
                                    "permalink": {
                                          "type": "string"
                                    },
                                    "resource_type": {
                                          "type": "string",
                                          "enum": [
                                                "pager_duty_incident",
                                                "opsgenie_alert",
                                                "datadog_monitor_alert",
                                                "github_pull_request",
                                                "gitlab_merge_request",
                                                "sentry_issue",
                                                "jira_issue",
                                                "jsm_alert",
                                                "atlassian_statuspage_incident",
                                                "zendesk_ticket",
                                                "google_calendar_event",
                                                "outlook_calendar_event",
                                                "slack_file",
                                                "scrubbed",
                                                "statuspage_incident"
                                          ]
                                    },
                                    "title": {
                                          "type": "string"
                                    }
                              },
                              "required": [
                                    "id",
                                    "permalink",
                                    "external_id",
                                    "title",
                                    "resource_type",
                                    "resource_type_label",
                                    "created_at",
                                    "updated_at"
                              ]
                        }
                  },
                  "required": [
                        "id",
                        "organisation_id",
                        "incident_id",
                        "resource",
                        "creator",
                        "created_at"
                  ]
            }
      },
      "required": [
            "incident_attachment"
      ]
},
    },
  },
};

export default incidentAttachmentsV1_Create;
