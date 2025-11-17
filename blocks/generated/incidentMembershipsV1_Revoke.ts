import { AppBlock, events } from "@slflows/sdk/v1";

const incidentMembershipsV1_Revoke: AppBlock = {
  name: "Revoke Incident Memberships V1",
  description: `Revoke a user's membership of a private incident`,
  category: "API",

  inputs: {
    default: {
      config: {
      "incident_id": {
            "name": "Incident Id",
            "description": "Revoke memberships to incident",
            "type": "string",
            "required": false
      },
      "user_id": {
            "name": "User Id",
            "description": "Request body field: user_id",
            "type": "string",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v1/incident_memberships/actions/revoke";
        const body: Record<string, any> = {};
        if (input.event.inputConfig.incident_id !== undefined) {
          body.incident_id = input.event.inputConfig.incident_id;
        }
        if (input.event.inputConfig.user_id !== undefined) {
          body.user_id = input.event.inputConfig.user_id;
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
      "additionalProperties": true
},
    },
  },
};

export default incidentMembershipsV1_Revoke;
