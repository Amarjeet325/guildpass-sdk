# GuildPass SDK 🛡️

The official TypeScript SDK for **GuildPass**, a Web3 membership and access-control protocol for token-gated communities, guilds, dashboards, Discord servers, and ecosystem integrations.

[![NPM Version](https://img.shields.io/npm/v/@guildpass/sdk)](https://www.npmjs.com/package/@guildpass/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

GuildPass SDK provides a clean, modular, and strongly typed interface for developers to integrate GuildPass membership checks and access control into their applications. It supports both Node.js and browser environments.

## Installation

```bash
pnpm add @guildpass/sdk
# or
npm install @guildpass/sdk
# or
yarn add @guildpass/sdk
```

## Quick Start

```typescript
import { GuildPassClient } from "@guildpass/sdk";

// Initialize the client
const client = new GuildPassClient({
  apiUrl: "https://api.guildpass.xyz",
  chainId: 8453, // Base
});

// Check access to a resource
async function checkAccess() {
  const result = await client.access.checkAccess({
    walletAddress: "0x1234567890123456789012345678901234567890",
    guildId: "my-guild",
    resourceId: "premium-content",
  });

  if (result.hasAccess) {
    console.log("Access Granted!");
  } else {
    console.log("Access Denied:", result.reason);
  }
}
```

## Configuration

The `GuildPassClient` accepts the following configuration:

```typescript
type GuildPassClientConfig = {
  apiUrl: string;          // GuildPass API URL
  chainId?: number;        // Default chain ID (default: 1)
  rpcUrl?: string;         // Optional RPC URL for on-chain checks
  contractAddress?: string; // Optional default contract address
  apiKey?: string;         // Optional API key for restricted endpoints
  timeoutMs?: number;      // Request timeout in milliseconds (default: 10000)
};
```

## Service Modules

The SDK is organized into modular services:

- `client.access`: Handle token-gated access and role checks.
- `client.membership`: Fetch and verify wallet membership status.
- `client.roles`: Manage and retrieve guild roles.
- `client.guilds`: Fetch guild configurations and metadata.
- `client.contracts`: (MVP) Helper stubs for future on-chain interactions.

## Development

### Build
```bash
pnpm build
```

### Test
```bash
pnpm test
```

### Lint & Format
```bash
pnpm lint
pnpm format
```

## MVP Limitations & TODOs

This is an MVP version of the SDK. Future updates will include:

- [ ] Full `viem` / `ethers` integration for on-chain validation.
- [ ] Wallet signature verification (SIWE).
- [ ] Multi-chain support enhancements.
- [ ] Caching layer for performance.
- [ ] React Hooks package (`@guildpass/react`).
- [ ] Discord-specific helper methods.

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to contribute.

## License

MIT © [GuildPass](https://guildpass.xyz)
