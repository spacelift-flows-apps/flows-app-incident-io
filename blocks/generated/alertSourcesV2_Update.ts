import { AppBlock, events } from "@slflows/sdk/v1";

const alertSourcesV2_Update: AppBlock = {
  name: "Update Alert Sources V2",
  description: `Update an existing alert source in your account.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "The ID of this alert source",
            "type": "string",
            "required": true
      },
      "http_custom_options": {
            "name": "Http Custom Options",
            "description": "Request body field: http_custom_options",
            "type": {
                  "type": "object",
                  "properties": {
                        "deduplication_key_path": {
                              "type": "string"
                        },
                        "transform_expression": {
                              "type": "string"
                        }
                  },
                  "required": [
                        "transform_expression",
                        "deduplication_key_path"
                  ]
            },
            "required": false
      },
      "jira_options": {
            "name": "Jira Options",
            "description": "Request body field: jira_options",
            "type": {
                  "type": "object",
                  "properties": {
                        "project_ids": {
                              "type": "array",
                              "items": {
                                    "type": "string"
                              }
                        }
                  },
                  "required": [
                        "project_ids"
                  ]
            },
            "required": false
      },
      "name": {
            "name": "Name",
            "description": "Unique name of the alert source",
            "type": "string",
            "required": false
      },
      "template": {
            "name": "Template",
            "description": "Request body field: template",
            "type": {
                  "type": "object",
                  "properties": {
                        "attributes": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "alert_attribute_id": {
                                                "type": "object",
                                                "additionalProperties": true
                                          },
                                          "binding": {
                                                "type": "object",
                                                "additionalProperties": true
                                          }
                                    },
                                    "required": [
                                          "alert_attribute_id",
                                          "binding"
                                    ]
                              }
                        },
                        "description": {
                              "type": "object",
                              "properties": {
                                    "literal": {
                                          "type": "string"
                                    },
                                    "reference": {
                                          "type": "string"
                                    }
                              },
                              "additionalProperties": true
                        },
                        "expressions": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "else_branch": {
                                                "type": "object",
                                                "additionalProperties": true
                                          },
                                          "label": {
                                                "type": "object",
                                                "additionalProperties": true
                                          },
                                          "operations": {
                                                "type": "object",
                                                "additionalProperties": true
                                          },
                                          "reference": {
                                                "type": "object",
                                                "additionalProperties": true
                                          },
                                          "root_reference": {
                                                "type": "object",
                                                "additionalProperties": true
                                          }
                                    },
                                    "required": [
                                          "label",
                                          "reference",
                                          "root_reference",
                                          "operations"
                                    ]
                              }
                        },
                        "title": {
                              "type": "object",
                              "properties": {
                                    "literal": {
                                          "type": "string"
                                    },
                                    "reference": {
                                          "type": "string"
                                    }
                              },
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "expressions",
                        "title",
                        "description",
                        "attributes"
                  ]
            },
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/alert_sources/{id}";
        url = url.replace("{id}", encodeURIComponent(String(input.event.inputConfig.id)));
        const body: Record<string, any> = {};
        if (input.event.inputConfig.http_custom_options !== undefined) {
          body.http_custom_options = input.event.inputConfig.http_custom_options;
        }
        if (input.event.inputConfig.jira_options !== undefined) {
          body.jira_options = input.event.inputConfig.jira_options;
        }
        if (input.event.inputConfig.name !== undefined) {
          body.name = input.event.inputConfig.name;
        }
        if (input.event.inputConfig.template !== undefined) {
          body.template = input.event.inputConfig.template;
        }
        const headers: Record<string, string> = {};

        const response = await fetch(url, {
          method: "PUT",
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
            "alert_source": {
                  "type": "object",
                  "properties": {
                        "email_options": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "http_custom_options": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "jira_options": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "name": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "secret_token": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "source_type": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "template": {
                              "type": "object",
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "id",
                        "organisation_id",
                        "state",
                        "name",
                        "source_type",
                        "template",
                        "alert_source",
                        "created_at",
                        "updated_at",
                        "alert_route_ids",
                        "auto_ack_in_source",
                        "missing_required_attributes"
                  ]
            }
      },
      "required": [
            "alert_source"
      ]
},
    },
  },
};

export default alertSourcesV2_Update;
