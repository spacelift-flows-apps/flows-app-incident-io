import { AppBlock, events } from "@slflows/sdk/v1";

const schedulesV2_ListScheduleEntries: AppBlock = {
  name: "ListScheduleEntries Schedules V2",
  description: `Get a list of schedule entries. The endpoint will return all entries that overlap with the given window, if one is provided.`,
  category: "API",

  inputs: {
    default: {
      config: {
      "schedule_id": {
            "name": "Schedule Id",
            "description": "The ID of the schedule to get entries for.",
            "type": "string",
            "required": true
      },
      "entry_window_start": {
            "name": "Entry Window Start",
            "description": "The start of the window to get entries for.",
            "type": "string",
            "required": false
      },
      "entry_window_end": {
            "name": "Entry Window End",
            "description": "The end of the window to get entries for.",
            "type": "string",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/schedule_entries";
        const queryParams = new URLSearchParams();
        if (input.event.inputConfig.schedule_id !== undefined) {
          queryParams.append("schedule_id", String(input.event.inputConfig.schedule_id));
        }
        if (input.event.inputConfig.entry_window_start !== undefined) {
          queryParams.append("entry_window_start", String(input.event.inputConfig.entry_window_start));
        }
        if (input.event.inputConfig.entry_window_end !== undefined) {
          queryParams.append("entry_window_end", String(input.event.inputConfig.entry_window_end));
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
                              "type": "object",
                              "additionalProperties": true
                        },
                        "after_url": {
                              "type": "object",
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "after",
                        "after_url"
                  ]
            },
            "schedule_entries": {
                  "type": "object",
                  "properties": {
                        "final": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "overrides": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "scheduled": {
                              "type": "object",
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "scheduled",
                        "overrides",
                        "final"
                  ]
            }
      },
      "required": [
            "schedule_entries"
      ]
},
    },
  },
};

export default schedulesV2_ListScheduleEntries;
