import { HTTPRequest, blocks, messaging } from "@slflows/sdk/v1";
import * as nodecrypto from "node:crypto";

/**
 * Verifies the webhook signature using Svix signing standard
 * incident.io uses Svix for webhook signing with HMAC-SHA256
 */
export async function verifyWebhookSignature(
  request: HTTPRequest,
  signingSecret: string
): Promise<boolean> {
  // Extract headers (incident.io uses webhook- prefix)
  const webhookId = request.headers["Webhook-Id"];
  const webhookTimestamp = request.headers["Webhook-Timestamp"];
  const webhookSignature = request.headers["Webhook-Signature"];

  if (!webhookId || !webhookTimestamp || !webhookSignature) {
    console.warn("Missing required webhook headers for signature verification");
    return false;
  }

  // Verify timestamp is within tolerance (5 minutes)
  const nowSeconds = Math.floor(Date.now() / 1000);
  const timestamp = parseInt(webhookTimestamp, 10);

  if (isNaN(timestamp) || Math.abs(nowSeconds - timestamp) > 300) {
    console.warn(
      "Webhook timestamp validation failed (too old or too new):",
      timestamp,
      "current:",
      nowSeconds
    );
    return false;
  }

  // Construct signed content: ${id}.${timestamp}.${body}
  const signedContent = `${webhookId}.${webhookTimestamp}.${request.rawBody}`;

  // Decode the signing secret (remove whsec_ prefix if present)
  const secretWithoutPrefix = signingSecret.startsWith("whsec_")
    ? signingSecret.substring(6)
    : signingSecret;

  // Calculate expected signature using HMAC-SHA256
  try {
    const encoder = new TextEncoder();

    // Decode base64 secret to bytes
    const secretBuffer = Buffer.from(secretWithoutPrefix, "base64");

    const key = await crypto.subtle.importKey(
      "raw",
      secretBuffer,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const mac = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(signedContent)
    );

    // Convert to base64
    const expectedSignature = Buffer.from(mac).toString("base64");

    // Parse signature header - format: "v1,signature v1,signature2 ..."
    const signatures = webhookSignature.split(" ");

    // Check if any signature matches (using timing-safe comparison)
    for (const sig of signatures) {
      const parts = sig.split(",");
      if (parts.length !== 2) continue;

      const [version, signature] = parts;
      if (version !== "v1") continue;

      // Use timing-safe comparison
      try {
        if (
          nodecrypto.timingSafeEqual(
            encoder.encode(expectedSignature),
            encoder.encode(signature)
          )
        ) {
          return true;
        }
      } catch (e) {
        // timingSafeEqual throws if lengths don't match - skip this signature
      }
    }

    console.warn("Webhook signature verification failed - no matching signature");
    return false;
  } catch (error: any) {
    console.error("Error during webhook signature verification:", error.message);
    return false;
  }
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
