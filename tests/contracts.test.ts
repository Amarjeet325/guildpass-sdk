import { describe, it, expect } from 'vitest';
import { GuildPassClient } from '../src/client/GuildPassClient';
import { GuildPassErrorCode } from '../src/errors/errorCodes';

describe('ContractClient (Stubs)', () => {
  const client = new GuildPassClient({ 
    apiUrl: 'https://api.test.com',
    contractAddress: '0x0000000000000000000000000000000000000000'
  });

  it('should throw NOT_IMPLEMENTED for getMembershipTokenBalance', async () => {
    try {
      await client.contracts.getMembershipTokenBalance({
        walletAddress: '0x1234567890123456789012345678901234567890'
      });
    } catch (error: any) {
      expect(error.code).toBe(GuildPassErrorCode.NOT_IMPLEMENTED);
    }
  });

  it('should throw NOT_IMPLEMENTED for validateRoleRequirement', async () => {
    try {
      await client.contracts.validateRoleRequirement({
        walletAddress: '0x1234567890123456789012345678901234567890',
        requirement: { type: 'TOKEN', minAmount: '1' }
      });
    } catch (error: any) {
      expect(error.code).toBe(GuildPassErrorCode.NOT_IMPLEMENTED);
    }
  });
});
