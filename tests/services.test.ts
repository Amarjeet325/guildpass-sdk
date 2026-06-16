import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GuildPassClient } from '../src/client/GuildPassClient';

describe('Service Modules', () => {
  let client: GuildPassClient;

  beforeEach(() => {
    client = new GuildPassClient({ apiUrl: 'https://api.test.com' });
    vi.stubGlobal('fetch', vi.fn());
  });

  describe('AccessService', () => {
    it('should call checkAccess endpoint', async () => {
      const mockResult = { hasAccess: true, matchedRoles: ['admin'] };
      (fetch as any).mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResult),
        headers: new Headers(),
      });

      const result = await client.access.checkAccess({
        walletAddress: '0x1234567890123456789012345678901234567890',
        guildId: 'guild_1',
        resourceId: 'res_1',
      });

      expect(result).toEqual(mockResult);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/access/check'),
        expect.objectContaining({
          method: 'GET',
        }),
      );
    });

    it('should normalise wallet address in query parameters', async () => {
      const mockResult = { hasAccess: true, matchedRoles: ['admin'] };
      (fetch as any).mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResult),
        headers: new Headers(),
      });

      const mixedCaseAddress = '0xAbCdEf1234567890AbCdEf1234567890AbCdEf12';
      await client.access.checkAccess({
        walletAddress: mixedCaseAddress,
        guildId: 'guild_1',
        resourceId: 'res_1',
      });

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`address=${mixedCaseAddress.toLowerCase()}`),
        expect.any(Object),
      );
    });
  });

  describe('MembershipService', () => {
    it('should call membership endpoint', async () => {
      const mockMembership = { isActive: true, roles: ['member'] };
      (fetch as any).mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockMembership),
        headers: new Headers(),
      });

      const result = await client.membership.getMembership({
        walletAddress: '0x1234567890123456789012345678901234567890',
        guildId: 'guild_1',
      });

      expect(result).toEqual(mockMembership);
    });
  });

  describe('RolesService', () => {
    it('should fetch roles for a guild', async () => {
      const mockRoles = [{ id: '1', name: 'Role 1' }];
      (fetch as any).mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockRoles),
        headers: new Headers(),
      });

      const result = await client.roles.getRoles({ guildId: 'guild_1' });
      expect(result).toEqual(mockRoles);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/guilds/guild_1/roles'),
        expect.any(Object),
      );
    });

    it('should URL-encode guild IDs in role endpoint paths', async () => {
      const mockRoles = [{ id: '1', name: 'Role 1' }];
      (fetch as any).mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockRoles),
        headers: new Headers(),
      });

      const result = await client.roles.getRoles({ guildId: 'guild/1' });
      expect(result).toEqual(mockRoles);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/guilds/guild%2F1/roles'),
        expect.any(Object),
      );
    });

    it('should URL-encode guild IDs in user roles endpoint paths', async () => {
      const mockRoles = [{ id: '1', name: 'Role 1' }];
      (fetch as any).mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockRoles),
        headers: new Headers(),
      });

      const validAddress = '0x1234567890123456789012345678901234567890';
      const result = await client.roles.getUserRoles({ guildId: 'guild/1', walletAddress: validAddress });
      expect(result).toEqual(mockRoles);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/guilds/guild%2F1/members/${validAddress}/roles`),
        expect.any(Object),
      );
    });

    it('should normalise wallet address in path parameters', async () => {
      const mockRoles = [{ id: '1', name: 'Role 1' }];
      (fetch as any).mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockRoles),
        headers: new Headers(),
      });

      const mixedCaseAddress = '0xAbCdEf1234567890AbCdEf1234567890AbCdEf12';
      await client.roles.getUserRoles({
        guildId: 'guild_1',
        walletAddress: mixedCaseAddress,
      });

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/members/${mixedCaseAddress.toLowerCase()}/roles`),
        expect.any(Object),
      );
    });
  });

  describe('GuildsService', () => {
    it('should fetch guild info', async () => {
      const mockGuild = { id: 'guild_1', name: 'Test Guild' };
      (fetch as any).mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockGuild),
        headers: new Headers(),
      });

      const result = await client.guilds.getGuild({ guildId: 'guild_1' });
      expect(result).toEqual(mockGuild);
    });

    it('should URL-encode guild IDs in guild endpoint paths', async () => {
      const mockGuild = { id: 'guild/1', name: 'Encoded Guild' };
      (fetch as any).mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockGuild),
        headers: new Headers(),
      });

      const result = await client.guilds.getGuild({ guildId: 'guild/1' });
      expect(result).toEqual(mockGuild);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/guilds/guild%2F1'),
        expect.any(Object),
      );
    });
  });
});
