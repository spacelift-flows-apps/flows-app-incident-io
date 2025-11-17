import { AppBlock, events } from "@slflows/sdk/v1";

const followupsV2_List: AppBlock = {
  name: "List Follow-ups V2",
  description: `List all follow-ups for an organisation.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "incident_id": {
            "name": "Incident Id",
            "description": "Find follow-ups related to this incident",
            "type": "string",
            "required": false
      },
      "incident_mode": {
            "name": "Incident Mode",
            "description": "Filter to follow-ups from incidents of the given mode. If not set, only follow-ups from `standard` and `retrospective` incidents are returned",
            "type": "string",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/follow_ups";
        const queryParams = new URLSearchParams();
        if (input.event.inputConfig.incident_id !== undefined) {
          queryParams.append("incident_id", String(input.event.inputConfig.incident_id));
        }
        if (input.event.inputConfig.incident_mode !== undefined) {
          queryParams.append("incident_mode", String(input.event.inputConfig.incident_mode));
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
            "follow_ups": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "additionalProperties": true
                  }
            }
      },
      "required": [
            "follow_ups"
      ]
},
    },
  },
};

export default followupsV2_List;
