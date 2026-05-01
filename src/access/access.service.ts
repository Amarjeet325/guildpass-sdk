import { HttpClient } from '../http/httpClient';
import { validateAddress, validateGuildId, validateResourceId, validateRoleId } from '../utils/validation';
import { AccessCheckParams, AccessCheckResult, RoleAccessCheckParams } from './access.types';

export class AccessService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Checks whether a wallet has access to a gated resource.
   */
  public async checkAccess(params: AccessCheckParams): Promise<AccessCheckResult> {
    const { walletAddress, guildId, resourceId } = params;
    
    validateAddress(walletAddress);
    validateGuildId(guildId);
    validateResourceId(resourceId);

    return this.http.get<AccessCheckResult>(`/access/check`, {
      params: {
        address: walletAddress,
        guildId,
        resourceId,
      },
    });
  }

  /**
   * Checks whether a wallet has a specific role in a guild.
   */
  public async checkRoleAccess(params: RoleAccessCheckParams): Promise<boolean> {
    const { walletAddress, guildId, roleId } = params;

    validateAddress(walletAddress);
    validateGuildId(guildId);
    validateRoleId(roleId);

    const result = await this.http.get<{ hasRole: boolean }>(`/access/role-check`, {
      params: {
        address: walletAddress,
        guildId,
        roleId,
      },
    });

    return result.hasRole;
  }
}
