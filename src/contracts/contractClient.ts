import { GuildPassError } from '../errors/GuildPassError';
import { GuildPassErrorCode } from '../errors/errorCodes';
import { validateAddress } from '../utils/validation';
import { RoleRequirementParams, TokenBalanceParams } from './contract.types';
import { validateRoleRequirementStub } from './contractHelpers';

export class ContractClient {
  private readonly rpcUrl?: string;
  private readonly defaultContractAddress?: string;

  constructor(rpcUrl?: string, contractAddress?: string) {
    this.rpcUrl = rpcUrl;
    this.defaultContractAddress = contractAddress;
  }

  /**
   * Fetches the membership token balance for a wallet.
   * Stub for future on-chain support.
   */
  public async getMembershipTokenBalance(params: TokenBalanceParams): Promise<string> {
    const { walletAddress, contractAddress = this.defaultContractAddress } = params;

    validateAddress(walletAddress);
    if (contractAddress) validateAddress(contractAddress);

    throw new GuildPassError(
      'getMembershipTokenBalance is not yet implemented. Requires on-chain provider.',
      GuildPassErrorCode.NOT_IMPLEMENTED
    );
  }

  /**
   * Fetches the owner of a guild from the contract.
   * Stub for future on-chain support.
   */
  public async getGuildOwner(params: { guildId: string }): Promise<string> {
    throw new GuildPassError(
      'getGuildOwner is not yet implemented. Requires on-chain provider.',
      GuildPassErrorCode.NOT_IMPLEMENTED
    );
  }

  /**
   * Validates a role requirement for a wallet address.
   * Stub for future on-chain support.
   */
  public async validateRoleRequirement(params: RoleRequirementParams): Promise<boolean> {
    const { walletAddress, requirement } = params;
    return validateRoleRequirementStub(walletAddress, requirement);
  }
}
