import { AppBlock, events } from "@slflows/sdk/v1";

const incidentAttachmentsV1_List: AppBlock = {
  name: "List Incident Attachments V1",
  description: `List all incident attachments for a given external resource or incident. You must provide either a specific incident ID or a specific external resource type and external ID.`,
  category: "Incident Attachments V1",

  inputs: {
    default: {
      config: {
      "incident_id": {
            "name": "Incident Id",
            "description": "Incident that this attachment is against",
            "type": "string",
            "required": false
      },
      "external_id": {
            "name": "External Id",
            "description": "ID of the resource in the external system",
            "type": "string",
            "required": false
      },
      "resource_type": {
            "name": "Resource Type",
            "description": "E.g. PagerDuty: the external system that holds the resource",
            "type": "string",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v1/incident_attachments";
        const queryParams = new URLSearchParams();
        if (input.event.inputConfig.incident_id !== undefined) {
          queryParams.append("incident_id", String(input.event.inputConfig.incident_id));
        }
        if (input.event.inputConfig.external_id !== undefined) {
          queryParams.append("external_id", String(input.event.inputConfig.external_id));
        }
        if (input.event.inputConfig.resource_type !== undefined) {
          queryParams.append("resource_type", String(input.event.inputConfig.resource_type));
        }
        if (queryParams.toString()) url += "?" + queryParams.toString();
        const headers: Record<string, string> = {};

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            ...headers,
          },
          
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
            "incident_attachments": {
                  "type": "array",
                  "items": {
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
            }
      },
      "required": [
            "incident_attachments"
      ]
},
    },
  },
};

export default incidentAttachmentsV1_List;
