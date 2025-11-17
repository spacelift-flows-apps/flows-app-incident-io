import { AppBlock, events } from "@slflows/sdk/v1";

const workflowsV2_ShowWorkflow: AppBlock = {
  name: "ShowWorkflow Workflows V2",
  description: `Show a workflow by ID`,
  category: "API",

  inputs: {
    default: {
      config: {
      "id": {
            "name": "Id",
            "description": "Unique identifier for the workflow",
            "type": "string",
            "required": true
      },
      "skip_step_upgrades": {
            "name": "Skip Step Upgrades",
            "description": "Skips workflow step upgrades, when the parameters for an existing workflow step change",
            "type": "boolean",
            "required": false
      }
},
      onEvent: async (input) => {
        const apiKey = input.app.config.apiKey;

        let url = "https://api.incident.io/v2/workflows/{id}";
        url = url.replace("{id}", encodeURIComponent(String(input.event.inputConfig.id)));
        const queryParams = new URLSearchParams();
        if (input.event.inputConfig.skip_step_upgrades !== undefined) {
          queryParams.append("skip_step_upgrades", String(input.event.inputConfig.skip_step_upgrades));
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
            "management_meta": {
                  "type": "object",
                  "properties": {
                        "annotations": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "managed_by": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "source_url": {
                              "type": "object",
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "annotations",
                        "managed_by"
                  ]
            },
            "workflow": {
                  "type": "object",
                  "properties": {
                        "condition_groups": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "continue_on_step_error": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "delay": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "expressions": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "folder": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "id": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "include_private_incidents": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "name": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "once_for": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "runs_from": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "runs_on_incident_modes": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "runs_on_incidents": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "shortform": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "state": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "steps": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "trigger": {
                              "type": "object",
                              "additionalProperties": true
                        },
                        "version": {
                              "type": "object",
                              "additionalProperties": true
                        }
                  },
                  "required": [
                        "id",
                        "organisation_id",
                        "name",
                        "trigger",
                        "once_for",
                        "version",
                        "expressions",
                        "condition_groups",
                        "steps",
                        "include_private_incidents",
                        "runs_on_incident_modes",
                        "continue_on_step_error",
                        "runs_on_incidents",
                        "created_at",
                        "updated_at",
                        "state"
                  ]
            }
      },
      "required": [
            "workflow",
            "management_meta"
      ]
},
    },
  },
};

export default workflowsV2_ShowWorkflow;
