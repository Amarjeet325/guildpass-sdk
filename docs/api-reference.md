# API Reference

## GuildPassClient

The main constructor.

```typescript
new GuildPassClient(config: GuildPassClientConfig)
```

### Methods

- `getConfig()`: Returns the current configuration.

---

## Access Module (`client.access`)

### `checkAccess(params: AccessCheckParams)`
Checks if a wallet can access a resource.
- **Returns**: `Promise<AccessCheckResult>`

### `checkRoleAccess(params: RoleAccessCheckParams)`
Checks if a wallet has a specific role.
- **Returns**: `Promise<boolean>`

---

## Membership Module (`client.membership`)

### `getMembership(params: MembershipParams)`
Fetches detailed membership status.
- **Returns**: `Promise<Membership>`

### `isMember(params: MembershipParams)`
Quick check for active membership.
- **Returns**: `Promise<boolean>`

---

## Roles Module (`client.roles`)

### `getRoles(params: GetRolesParams)`
Fetches all roles for a guild.
- **Returns**: `Promise<GuildRole[]>`

### `getUserRoles(params: GetUserRolesParams)`
Fetches roles assigned to a user.
- **Returns**: `Promise<GuildRole[]>`

---

## Guilds Module (`client.guilds`)

### `getGuild(params: GetGuildParams)`
Fetches basic guild metadata.
- **Returns**: `Promise<Guild>`

### `getGuildConfig(params: GetGuildParams)`
Fetches full guild configuration.
- **Returns**: `Promise<GuildConfig>`
