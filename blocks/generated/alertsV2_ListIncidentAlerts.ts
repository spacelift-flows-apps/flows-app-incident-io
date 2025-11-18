import { AppBlock, events } from "@slflows/sdk/v1";

const alertsV2_ListIncidentAlerts: AppBlock = {
  name: "ListIncidentAlerts Alerts V2",
  description: `List the connections between incidents and alerts`,
  category: "Alerts V2",

  inputs: {
    default: {
      config: {
      "page_size": {
            "name": "Page Size",
            "description": "Number of incident alerts to return per page",
            "type": "number",
            "required": true
      },
      "after": {
            "name": "After",
            "description": "If provided, pass this as the 'after' param to load the next page",
            "type": "string",
            "required": false
      },
      "alert_id": {
            "name": "Alert Id",
            "description": "Alert that this incident alert refers to",
            "type": "string",
            "required": false
      },
      "incident_id": {
            "name": "Incident Id",
            "description": "Incident that this incident alert is attached to",
            "type": "string",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/incident_alerts";
        const queryParams = new URLSearchParams();
        if (input.event.inputConfig.page_size !== undefined) {
          queryParams.append("page_size", String(input.event.inputConfig.page_size));
        }
        if (input.event.inputConfig.after !== undefined) {
          queryParams.append("after", String(input.event.inputConfig.after));
        }
        if (input.event.inputConfig.alert_id !== undefined) {
          queryParams.append("alert_id", String(input.event.inputConfig.alert_id));
        }
        if (input.event.inputConfig.incident_id !== undefined) {
          queryParams.append("incident_id", String(input.event.inputConfig.incident_id));
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
            "incident_alerts": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "alert": {
                                    "type": "object",
                                    "properties": {
                                          "alert_source_id": {
                                                "type": "string"
                                          },
                                          "created_at": {
                                                "type": "string"
                                          },
                                          "deduplication_key": {
                                                "type": "string"
                                          },
                                          "description": {
                                                "type": "string"
                                          },
                                          "id": {
                                                "type": "string"
                                          },
                                          "resolved_at": {
                                                "type": "string"
                                          },
                                          "source_url": {
                                                "type": "string"
                                          },
                                          "status": {
                                                "type": "string",
                                                "enum": [
                                                      "firing",
                                                      "resolved"
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
                                          "title",
                                          "deduplication_key",
                                          "alert_source_id",
                                          "source_type",
                                          "status",
                                          "created_at",
                                          "updated_at"
                                    ]
                              },
                              "alert_route_id": {
                                    "type": "string"
                              },
                              "id": {
                                    "type": "string"
                              },
                              "incident": {
                                    "type": "object",
                                    "properties": {
                                          "external_id": {
                                                "type": "number"
                                          },
                                          "id": {
                                                "type": "string"
                                          },
                                          "name": {
                                                "type": "string"
                                          },
                                          "reference": {
                                                "type": "string"
                                          },
                                          "status_category": {
                                                "type": "string",
                                                "enum": [
                                                      "triage",
                                                      "declined",
                                                      "merged",
                                                      "canceled",
                                                      "active",
                                                      "post-incident",
                                                      "closed",
                                                      "paused"
                                                ]
                                          },
                                          "summary": {
                                                "type": "string"
                                          },
                                          "visibility": {
                                                "type": "string",
                                                "enum": [
                                                      "public",
                                                      "private"
                                                ]
                                          }
                                    },
                                    "required": [
                                          "id",
                                          "external_id",
                                          "name",
                                          "reference",
                                          "visibility",
                                          "status_category"
                                    ]
                              }
                        },
                        "required": [
                              "id",
                              "alert",
                              "incident"
                        ]
                  }
            },
            "pagination_meta": {
                  "type": "object",
                  "properties": {
                        "after": {
                              "type": "string"
                        },
                        "page_size": {
                              "type": "number"
                        }
                  },
                  "required": [
                        "page_size"
                  ]
            }
      },
      "required": [
            "incident_alerts",
            "pagination_meta"
      ]
},
    },
  },
};

export default alertsV2_ListIncidentAlerts;
