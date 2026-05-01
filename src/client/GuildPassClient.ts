import { AccessService } from '../access/access.service';
import { DEFAULT_CONFIG } from '../config/defaultConfig';
import { GuildPassClientConfig } from '../config/sdkConfig';
import { ContractClient } from '../contracts/contractClient';
import { GuildsService } from '../guilds/guilds.service';
import { HttpClient } from '../http/httpClient';
import { MembershipService } from '../membership/membership.service';
import { RolesService } from '../roles/roles.service';

/**
 * The main GuildPass SDK client.
 * 
 * Provides access to all GuildPass protocol services including
 * access control, membership, roles, and guilds.
 */
export class GuildPassClient {
  public readonly access: AccessService;
  public readonly membership: MembershipService;
  public readonly roles: RolesService;
  public readonly guilds: GuildsService;
  public readonly contracts: ContractClient;

  private readonly http: HttpClient;
  private readonly config: GuildPassClientConfig;

  constructor(config: GuildPassClientConfig) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };

    this.http = new HttpClient(
      this.config.apiUrl,
      this.config.apiKey,
      this.config.timeoutMs
    );

    this.access = new AccessService(this.http);
    this.membership = new MembershipService(this.http);
    this.roles = new RolesService(this.http);
    this.guilds = new GuildsService(this.http);
    this.contracts = new ContractClient(
      this.config.rpcUrl,
      this.config.contractAddress
    );
  }

  /**
   * Returns the current SDK configuration.
   */
  public getConfig(): GuildPassClientConfig {
    return { ...this.config };
  }
}
