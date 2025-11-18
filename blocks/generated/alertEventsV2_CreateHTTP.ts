import { AppBlock, events } from "@slflows/sdk/v1";

const alertEventsV2_CreateHTTP: AppBlock = {
  name: "CreateHTTP Alert Events V2",
  description: `Create an alert event using an HTTP source.`,
  category: "Alert Events V2",

  inputs: {
    default: {
      config: {
      "alert_source_config_id": {
            "name": "Alert Source Config Id",
            "description": "Which alert source config produced this alert",
            "type": "string",
            "required": true
      },
      "token": {
            "name": "Token",
            "description": "Token used to authenticate the request, generated when configuring the alert source. Will be consumed via a URL query string parameter",
            "type": "string",
            "required": false
      },
      "deduplication_key": {
            "name": "Deduplication Key",
            "description": "A deduplication key which uniquely references this alert from your alert source. For newly created HTTP sources, this field is required.\nIf you send an event with the same deduplication_key multiple times, only one alert will be created in incident.io for this alert source config.\nYou can filter on this field to find the alert created by an event you've sent us.",
            "type": "string",
            "required": false
      },
      "description": {
            "name": "Description",
            "description": "Description that optionally adds more detail to title. Supports markdown.",
            "type": "string",
            "required": false
      },
      "metadata": {
            "name": "Metadata",
            "description": "Any additional metadata that you've configured your alert source to parse",
            "type": {
                  "type": "object",
                  "additionalProperties": true
            },
            "required": false
      },
      "source_url": {
            "name": "Source Url",
            "description": "If applicable, a link to the alert in the upstream system",
            "type": "string",
            "required": false
      },
      "status": {
            "name": "Status",
            "description": "Current status of this alert",
            "type": "string",
            "required": false
      },
      "title": {
            "name": "Title",
            "description": "The title of the alert, parsed from the alert payload according to the alert source configuration",
            "type": "string",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/alert_events/http/{alert_source_config_id}";
        url = url.replace("{alert_source_config_id}", encodeURIComponent(String(input.event.inputConfig.alert_source_config_id)));
        const queryParams = new URLSearchParams();
        if (input.event.inputConfig.token !== undefined) {
          queryParams.append("token", String(input.event.inputConfig.token));
        }
        if (queryParams.toString()) url += "?" + queryParams.toString();
        const body: Record<string, any> = {};
        if (input.event.inputConfig.deduplication_key !== undefined) {
          body.deduplication_key = input.event.inputConfig.deduplication_key;
        }
        if (input.event.inputConfig.description !== undefined) {
          body.description = input.event.inputConfig.description;
        }
        if (input.event.inputConfig.metadata !== undefined) {
          body.metadata = input.event.inputConfig.metadata;
        }
        if (input.event.inputConfig.source_url !== undefined) {
          body.source_url = input.event.inputConfig.source_url;
        }
        if (input.event.inputConfig.status !== undefined) {
          body.status = input.event.inputConfig.status;
        }
        if (input.event.inputConfig.title !== undefined) {
          body.title = input.event.inputConfig.title;
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

export default alertEventsV2_CreateHTTP;
