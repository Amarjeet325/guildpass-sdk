# SDK Architecture

The GuildPass SDK is designed to be lightweight, modular, and easy to extend.

## Core Components

### 1. GuildPassClient
The main entry point. It orchestrates the various services and holds the configuration.

### 2. HttpClient
A wrapper around the native `fetch` API. It handles:
- Base URL management
- API Key injection
- Timeout handling
- Error normalization
- JSON parsing

### 3. Services
Each service corresponds to a specific domain of the GuildPass protocol:
- **AccessService**: Handles `/access` endpoints.
- **MembershipService**: Handles `/membership` endpoints.
- **RolesService**: Handles `/guilds/:id/roles` endpoints.
- **GuildsService**: Handles `/guilds` configuration endpoints.

### 4. ContractClient
Designed for future on-chain support. Currently provides stubs and validation patterns for:
- Token balance checks
- On-chain role requirement validation
- Guild ownership lookup

## Data Flow

1. Developer initializes `GuildPassClient`.
2. Developer calls a method on a service (e.g., `client.access.checkAccess`).
3. Service validates input using `src/utils/validation.ts`.
4. Service calls `HttpClient` with the appropriate path and params.
5. `HttpClient` executes the fetch request.
6. If the request fails, a `GuildPassError` is thrown with a specific `GuildPassErrorCode`.
7. If successful, the typed response is returned to the developer.

## Design Principles

- **Zero External Dependencies**: The SDK relies on native platform features (like `fetch` and `AbortController`) to keep the bundle size small.
- **Strong Typing**: Everything is typed with TypeScript for the best developer experience.
- **Fail Fast**: Input validation happens before network requests.
- **Environment Agnostic**: Works in Node.js, Browsers, and Edge runtimes.
