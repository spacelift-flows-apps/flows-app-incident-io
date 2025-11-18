import { AppBlock, events } from "@slflows/sdk/v1";

const usersV2_Show: AppBlock = {
  name: "Show Users V2",
  description: `Get a single user.`,
  category: "Users V2",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "Unique identifier of the user",
            "type": "string",
            "required": true
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/users/{id}";
        url = url.replace("{id}", encodeURIComponent(String(input.event.inputConfig.id)));
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
            "user": {
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
      },
      "required": [
            "user"
      ]
},
    },
  },
};

export default usersV2_Show;
