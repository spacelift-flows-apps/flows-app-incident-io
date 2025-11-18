/**
 * Block Registry for incident.io
 *
 * This file exports all blocks as a dictionary for easy registration.
 */

import { generatedBlocks } from "./generated/index";
import { webhookSubscriptions } from "./webhooks/index";

/**
 * Dictionary of all available blocks
 * Includes both auto-generated API blocks and webhook subscription blocks
 */
export const blocks = {
  // Auto-generated API blocks
  ...generatedBlocks,

  // Auto-generated webhook subscription blocks
  ...webhookSubscriptions,
} as const;
