import { HttpClient } from '../http/httpClient';
import { validateAddress, validateGuildId } from '../utils/validation';
import { Membership, MembershipParams } from './membership.types';

export class MembershipService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Fetches wallet membership status for a specific guild.
   */
  public async getMembership(params: MembershipParams): Promise<Membership> {
    const { walletAddress, guildId } = params;

    validateAddress(walletAddress);
    validateGuildId(guildId);

    return this.http.get<Membership>(`/membership`, {
      params: {
        address: walletAddress,
        guildId,
      },
    });
  }

  /**
   * Checks if a wallet is an active member of a guild.
   */
  public async isMember(params: MembershipParams): Promise<boolean> {
    const membership = await this.getMembership(params);
    return membership.isActive;
  }
}
