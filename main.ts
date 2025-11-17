import { defineApp, http, kv } from "@slflows/sdk/v1";
import { blocks } from "./blocks/index";
import {
  verifyWebhookSecret,
  handleWebhookEndpoint,
} from "./httpHandlerHelpers";

export const app = defineApp({
  name: "incident.io",
  installationInstructions: `## Setup Instructions

To connect your incident.io account:

### Step 1: Create an API Key

1. Visit [incident.io Dashboard → API Keys](https://app.incident.io/settings/api-keys)
2. Click "Create API key"
3. Give it a descriptive name (e.g., "Flows Integration")
4. Select appropriate permissions for your use case
5. **Important**: Copy the API key immediately - it will only be shown once!

### Step 2: Configure the App

1. Paste your API key in the "API Key" field below
2. Click "Confirm" to complete the installation
3. Wait for the app to reach "ready" status

### Step 3: Configure Webhook (Optional - for Webhook Subscriptions)

To receive real-time events from incident.io:

1. After the app is ready, copy the **Webhook URL** from the app signals
2. Visit [incident.io Dashboard → Webhooks](https://app.incident.io/settings/webhooks)
3. Click "Create webhook"
4. Paste the Webhook URL (includes authentication secret as query parameter)
5. Select which event types you want to receive
6. Save the webhook configuration

### Step 4: Add Webhook Subscription Blocks

- Add webhook subscription blocks (e.g., "Public Incident - Incident Created V2") to your flow
- These blocks will emit events when matching webhooks are received
- Each subscription block filters to its specific event type automatically

## About the Blocks

This app includes:
- **130 API Blocks**: Auto-generated from the incident.io OpenAPI specification, covering all API endpoints
- **130 Webhook Subscription Blocks**: For receiving real-time events (incidents, actions, follow-ups, alerts, etc.)

For more information, visit the [incident.io API documentation](https://api-docs.incident.io/).`,

  blocks,

  config: {
    apiKey: {
      name: "API Key",
      description: `Your incident.io API key

**To create:**
1. Go to [incident.io Dashboard → API Keys](https://app.incident.io/settings/api-keys)
2. Click "Create API key"
3. Choose permissions carefully - they can only be set at creation time
4. Copy the key (shown only once) and paste it here`,
      type: "string",
      required: true,
      sensitive: true,
    },
    baseUrl: {
      name: "Base URL",
      description: "API base URL (leave default unless using a custom instance)",
      type: "string",
      required: false,
      default: "https://api.incident.io",
    },
  },

  signals: {
    webhookUrl: {
      name: "Webhook URL",
      description:
        "The URL to configure in incident.io webhooks (includes authentication secret)",
    },
  },

  async onSync(input) {
    const { apiKey } = input.app.config;

    if (!apiKey) {
      return {
        newStatus: "failed",
        customStatusDescription: "API key is required",
      };
    }

    // Generate webhook secret if not already exists
    const storedSecret = await kv.app.get("webhookSecret");
    let webhookSecret: string;

    if (!storedSecret?.value) {
      webhookSecret = generateWebhookSecret();
      await kv.app.set({
        key: "webhookSecret",
        value: webhookSecret,
      });
      console.log("Generated new webhook secret");
    } else {
      webhookSecret = storedSecret.value as string;
    }

    // Build webhook URL with secret as query parameter
    const webhookUrl = `${input.app.http.url}/webhook?secret=${webhookSecret}`;

    return {
      newStatus: "ready",
      signalUpdates: {
        webhookUrl,
      },
    };
  },

  http: {
    async onRequest(input) {
      const requestPath = input.request.path;

      // Handle webhook endpoint
      if (requestPath === "/webhook" || requestPath.endsWith("/webhook")) {
        const storedSecret = await kv.app.get("webhookSecret");

        if (!storedSecret?.value) {
          console.error("Webhook secret not configured");
          await http.respond(input.request.requestId, {
            statusCode: 500,
            body: { error: "Webhook not configured" },
          });
          return;
        }

        // Verify webhook secret
        const isValid = verifyWebhookSecret(
          input.request,
          storedSecret.value as string
        );

        if (!isValid) {
          console.warn("Invalid webhook secret");
          await http.respond(input.request.requestId, {
            statusCode: 403,
            body: { error: "Invalid webhook secret" },
          });
          return;
        }

        // Route the webhook event
        const response = await handleWebhookEndpoint(input.request.body);
        await http.respond(input.request.requestId, response);
        return;
      }

      // Unknown endpoint
      await http.respond(input.request.requestId, {
        statusCode: 404,
        body: { error: "Endpoint not found" },
      });
    },
  },
});

/**
 * Generates a secure random webhook secret
 */
function generateWebhookSecret(): string {
  const randomBytes = new Uint8Array(32);
  crypto.getRandomValues(randomBytes);
  return Array.from(randomBytes, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}
