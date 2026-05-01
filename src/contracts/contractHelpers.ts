import { GuildPassError } from '../errors/GuildPassError';
import { GuildPassErrorCode } from '../errors/errorCodes';
import { AccessRequirement } from '../types/common';

/**
 * Validates a role requirement against a wallet address.
 * Currently a stub for future on-chain validation.
 * 
 * TODO: Integrate with viem or ethers for on-chain checks
 */
export const validateRoleRequirementStub = async (
  walletAddress: string,
  requirement: AccessRequirement
): Promise<boolean> => {
  console.log(`Stub: Validating requirement for ${walletAddress}`, requirement);
  
  // For MVP, we throw a NOT_IMPLEMENTED error if developers try to use this
  // but we provide the function signature for future use.
  throw new GuildPassError(
    'On-chain requirement validation is not yet implemented in the MVP SDK.',
    GuildPassErrorCode.NOT_IMPLEMENTED
  );
};
