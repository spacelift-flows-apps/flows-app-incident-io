import { AppBlock, events } from "@slflows/sdk/v1";

const usersV2_List: AppBlock = {
  name: "List Users V2",
  description: `List users in your account.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "email": {
            "name": "Email",
            "description": "Filter by email address",
            "type": "string",
            "required": false
      },
      "slack_user_id": {
            "name": "Slack User Id",
            "description": "Filter by Slack user ID",
            "type": "string",
            "required": false
      },
      "page_size": {
            "name": "Page Size",
            "description": "Integer number of records to return",
            "type": "number",
            "required": false
      },
      "after": {
            "name": "After",
            "description": "An record's ID. This endpoint will return a list of records after this ID in relation to the API response order.",
            "type": "string",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/users";
        const queryParams = new URLSearchParams();
        if (input.event.inputConfig.email !== undefined) {
          queryParams.append("email", String(input.event.inputConfig.email));
        }
        if (input.event.inputConfig.slack_user_id !== undefined) {
          queryParams.append("slack_user_id", String(input.event.inputConfig.slack_user_id));
        }
        if (input.event.inputConfig.page_size !== undefined) {
          queryParams.append("page_size", String(input.event.inputConfig.page_size));
        }
        if (input.event.inputConfig.after !== undefined) {
          queryParams.append("after", String(input.event.inputConfig.after));
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
            },
            "users": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "base_role": {
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
                                          "slug": {
                                                "type": "string"
                                          }
                                    },
                                    "required": [
                                          "id",
                                          "organisation_id",
                                          "name",
                                          "slug",
                                          "privileges",
                                          "is_base_role",
                                          "rank",
                                          "created_at",
                                          "updated_at"
                                    ]
                              },
                              "custom_roles": {
                                    "type": "array",
                                    "items": {
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
                                                "slug": {
                                                      "type": "string"
                                                }
                                          },
                                          "required": [
                                                "id",
                                                "organisation_id",
                                                "name",
                                                "slug",
                                                "privileges",
                                                "is_base_role",
                                                "rank",
                                                "created_at",
                                                "updated_at"
                                          ]
                                    }
                              },
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
                              "base_role",
                              "custom_roles",
                              "role",
                              "id",
                              "slack_role",
                              "name",
                              "deprecated_base_role",
                              "organisation_id"
                        ]
                  }
            }
      },
      "required": [
            "users",
            "pagination_meta"
      ]
},
    },
  },
};

export default usersV2_List;
