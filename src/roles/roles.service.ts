import { HttpClient } from '../http/httpClient';
import { validateAddress, validateGuildId } from '../utils/validation';
import { GetRolesParams, GetUserRolesParams, GuildRole } from './roles.types';

export class RolesService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Fetches all roles available in a guild.
   */
  public async getRoles(params: GetRolesParams): Promise<GuildRole[]> {
    const { guildId } = params;
    validateGuildId(guildId);

    return this.http.get<GuildRole[]>(`/guilds/${guildId}/roles`);
  }

  /**
   * Fetches roles assigned to a specific wallet in a guild.
   */
  public async getUserRoles(params: GetUserRolesParams): Promise<GuildRole[]> {
    const { walletAddress, guildId } = params;

    validateAddress(walletAddress);
    validateGuildId(guildId);

    return this.http.get<GuildRole[]>(`/guilds/${guildId}/members/${walletAddress}/roles`);
  }
}
