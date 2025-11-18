import { AppBlock, events } from "@slflows/sdk/v1";

const incidentRolesV2_Delete: AppBlock = {
  name: "Delete Incident Roles V2",
  description: `Removes an existing role`,
  category: "Incident Roles V2",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "Unique identifier for the role",
            "type": "string",
            "required": true
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/incident_roles/{id}";
        url = url.replace("{id}", encodeURIComponent(String(input.event.inputConfig.id)));
        const body = undefined;
        const headers: Record<string, string> = {};

        const response = await fetch(url, {
          method: "DELETE",
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

export default incidentRolesV2_Delete;
