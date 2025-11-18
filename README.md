# incident.io

## Description

App for integrating with incident.io. Provides full API access and real-time webhook subscriptions for incident events.

All blocks (both API blocks and webhook receivers) are auto-generated from the official incident.io OpenAPI specification.

## Configuration

The app requires:

- `apiKey` - API key from incident.io dashboard (required)
- `webhookSigningSecret` - Signing secret from webhook endpoint configuration (optional, only needed for webhook subscriptions)
- `baseUrl` - API base URL (optional, defaults to https://api.incident.io)

See installation instructions for setup steps. You'll need to create an API key in the incident.io dashboard, and optionally configure a webhook endpoint if you want to receive real-time events.

## Blocks

### API Blocks (129)

Full coverage of the incident.io REST API, organized by category:

- **Incidents** - Create, list, update incidents (V1 and V2)
- **Custom Fields** - Manage custom field definitions and options
- **Severities & Statuses** - Configure incident severities and statuses
- **Incident Roles** - Define and assign incident roles (V1 and V2)
- **Actions & Follow-ups** - Track work during and after incidents (V1 and V2)
- **Workflows** - Manage incident.io workflows
- **Alerts** - Alert attributes, sources, routes, and alert management
- **Escalations** - Configure and manage escalation paths
- **Schedules** - On-call schedule management
- **Catalog** - Service and team catalog (V2 and V3)
- **Utilities** - Identity checks, OpenAPI specs

### Webhook Subscriptions (19)

Subscribe to real-time events from incident.io:

- **Public Incident Events**
  - `publicIncidentIncidentCreatedV2Subscription` - New incidents
  - `publicIncidentIncidentUpdatedV2Subscription` - Incident updates
  - `publicIncidentIncidentStatusUpdatedV2Subscription` - Status changes
  - `publicIncidentActionCreatedV1Subscription` / `publicIncidentActionUpdatedV1Subscription` - Action tracking
  - `publicIncidentFollowUpCreatedV1/V2Subscription` / `publicIncidentFollowUpUpdatedV1/V2Subscription` - Follow-up management

- **Private Incident Events**
  - `privateIncidentIncidentCreatedV2Subscription` / `privateIncidentIncidentUpdatedV2Subscription`
  - `privateIncidentActionCreatedV1Subscription` / `privateIncidentActionUpdatedV1Subscription`
  - `privateIncidentFollowUpCreatedV1/V2Subscription` / `privateIncidentFollowUpUpdatedV1/V2Subscription`
  - `privateIncidentMembershipGrantedV1Subscription` / `privateIncidentMembershipRevokedV1Subscription` - Access control

Each subscription block filters events by `event_type` and emits matching webhook payloads to downstream blocks.

## Webhook Architecture

The app exposes a single HTTP endpoint (`/webhook`) that receives all webhooks from incident.io.

When a webhook arrives:
1. Request signature is verified using Svix signing standard (HMAC-SHA256)
2. Event is routed to matching subscription blocks via internal messaging
3. Subscription blocks check the `event_type` and emit events for downstream processing

This pattern allows multiple subscription blocks to receive the same webhook event, each filtering for their specific event type. Similar to how the Slack app handles Events API callbacks.

## Code Generation

All blocks are generated from the incident.io OpenAPI specification using `scripts/generateBlocks.ts`. The generator:

- Parses the OpenAPI 3.0 spec from `openapi/swagger.json`
- Creates TypeScript blocks for all REST API endpoints
- Generates webhook subscription blocks from the `x-webhooks` section
- Maps OpenAPI schemas to Flows input/output types

To regenerate blocks after API updates:

```bash
# Download latest OpenAPI spec to openapi/swagger.json, then:
npm run generate
```

The generator creates blocks in:
- `blocks/generated/` - API blocks (129)
- `blocks/webhooks/` - Webhook subscriptions (19)

You can fetch the openapi schema on https://api-docs.incident.io, at the very top of the page.
