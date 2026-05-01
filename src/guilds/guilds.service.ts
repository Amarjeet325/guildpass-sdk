import { HttpClient } from '../http/httpClient';
import { validateGuildId } from '../utils/validation';
import { GetGuildParams, Guild, GuildConfig } from './guilds.types';

export class GuildsService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Fetches basic guild information.
   */
  public async getGuild(params: GetGuildParams): Promise<Guild> {
    const { guildId } = params;
    validateGuildId(guildId);

    return this.http.get<Guild>(`/guilds/${guildId}`);
  }

  /**
   * Fetches full guild configuration including theme and social links.
   */
  public async getGuildConfig(params: GetGuildParams): Promise<GuildConfig> {
    const { guildId } = params;
    validateGuildId(guildId);

    return this.http.get<GuildConfig>(`/guilds/${guildId}/config`);
  }
}
