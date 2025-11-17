import { HTTPRequest, blocks, messaging } from "@slflows/sdk/v1";

/**
 * Verifies the webhook secret from the query parameter
 */
export function verifyWebhookSecret(
  request: HTTPRequest,
  expectedSecret: string
): boolean {
  const secret = request.query.secret;

  if (!secret || secret !== expectedSecret) {
    console.warn("Invalid or missing webhook secret");
    return false;
  }

  return true;
}

/**
 * Converts event_type to block typeId
 * e.g., "public_incident.incident_created_v2" -> "publicIncidentIncidentCreatedV2Subscription"
 */
function eventTypeToBlockTypeId(eventType: string): string {
  const name = eventType
    .replace(/[._]/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  return name.charAt(0).toLowerCase() + name.slice(1) + "Subscription";
}

/**
 * Handles incoming webhook events from incident.io
 * Routes events to appropriate subscription blocks based on event_type
 */
export async function handleWebhookEndpoint(
  payload: any
): Promise<{ statusCode: number; body?: any }> {
  console.log("Received incident.io webhook:", payload?.event_type);

  if (!payload || !payload.event_type) {
    console.warn("Webhook payload missing event_type:", payload);
    return {
      statusCode: 400,
      body: { error: "Missing event_type in webhook payload" },
    };
  }

  try {
    // Convert event_type to block typeId and list only matching blocks
    const blockTypeId = eventTypeToBlockTypeId(payload.event_type);

    const subscriptionBlocks = await blocks.list({
      typeIds: [blockTypeId],
    });

    if (subscriptionBlocks.blocks.length === 0) {
      console.log(`No subscription blocks found for event type: ${payload.event_type}`);
      return { statusCode: 200, body: { status: "no_subscribers" } };
    }

    // Route to matching subscription blocks
    console.log(
      `Routing webhook event ${payload.event_type} to ${subscriptionBlocks.blocks.length} subscription block(s)`
    );

    await messaging.sendToBlocks({
      blockIds: subscriptionBlocks.blocks.map((b) => b.id),
      body: payload,
    });

    return { statusCode: 200, body: { status: "delivered" } };
  } catch (error: any) {
    console.error("Error routing webhook event:", error.message);
    return {
      statusCode: 500,
      body: { error: "Failed to route webhook event" },
    };
  }
}
