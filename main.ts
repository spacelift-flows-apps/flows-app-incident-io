import { defineApp, http } from "@slflows/sdk/v1";
import { blocks } from "./blocks/index";
import {
  verifyWebhookSignature,
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
6. Paste your API key in the "API Key" field below

### Step 2: Configure Webhook (Required for Webhook Subscriptions)

To receive real-time events from incident.io:

1. Visit [incident.io Dashboard → Webhooks](https://app.incident.io/settings/webhooks)
2. Click "Add Endpoint"
3. **Endpoint URL**: Enter <copyable>\`{appEndpointUrl}/webhook\`</copyable>
4. **Subscribe to events**: Leave blank, so all events are sent to the Flows app.
5. Click "Create"
6. **Copy the Signing Secret**: On the webhook endpoint details page, find and copy the "Signing Secret" (starts with \`whsec_\`)
7. Paste the Signing Secret in the "Webhook Signing Secret" field below

**Note**: The signing secret is used to verify that webhooks genuinely come from incident.io and haven't been tampered with.

### Step 3: Confirm Installation

Click "Confirm" to complete the installation.`,

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
    webhookSigningSecret: {
      name: "Webhook Signing Secret",
      description: `Signing secret from your incident.io webhook endpoint (starts with whsec_)

**To get this:**
1. Go to [incident.io Dashboard → Webhooks](https://app.incident.io/settings/webhooks)
2. Create a webhook endpoint pointing to this app's webhook URL
3. Copy the "Signing Secret" from the webhook endpoint settings
4. Paste it here

**Required only if using webhook subscription blocks**`,
      type: "string",
      required: false,
      sensitive: true,
    },
    baseUrl: {
      name: "Base URL",
      description:
        "API base URL (leave default unless using a custom instance)",
      type: "string",
      required: false,
      default: "https://api.incident.io",
    },
  },

  http: {
    async onRequest(input) {
      const requestPath = input.request.path;

      // Handle webhook endpoint
      if (requestPath === "/webhook" || requestPath.endsWith("/webhook")) {
        const { webhookSigningSecret } = input.app.config;

        if (!webhookSigningSecret) {
          console.error("Webhook signing secret not configured");
          await http.respond(input.request.requestId, {
            statusCode: 500,
            body: { error: "Webhook signing secret not configured" },
          });
          return;
        }

        // Verify webhook signature
        const isValid = await verifyWebhookSignature(
          input.request,
          webhookSigningSecret as string,
        );

        if (!isValid) {
          console.warn("Invalid webhook signature");
          await http.respond(input.request.requestId, {
            statusCode: 403,
            body: { error: "Invalid webhook signature" },
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
