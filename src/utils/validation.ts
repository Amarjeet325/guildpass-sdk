import { GuildPassError } from '../errors/GuildPassError';
import { GuildPassErrorCode } from '../errors/errorCodes';

/**
 * Validates an Ethereum address.
 * 
 * @param address The address to validate
 * @throws GuildPassError if the address is invalid
 */
export const validateAddress = (address: string): void => {
  if (!address) {
    throw new GuildPassError('Address is required', GuildPassErrorCode.INVALID_INPUT);
  }
  
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  if (!ethAddressRegex.test(address)) {
    throw new GuildPassError(`Invalid Ethereum address: ${address}`, GuildPassErrorCode.INVALID_ADDRESS);
  }
};

/**
 * Validates a Guild ID.
 * 
 * @param guildId The guild ID to validate
 * @throws GuildPassError if the guild ID is invalid
 */
export const validateGuildId = (guildId: string): void => {
  if (!guildId || typeof guildId !== 'string' || guildId.trim().length === 0) {
    throw new GuildPassError('Invalid Guild ID', GuildPassErrorCode.INVALID_INPUT);
  }
};

/**
 * Validates a Resource ID.
 * 
 * @param resourceId The resource ID to validate
 * @throws GuildPassError if the resource ID is invalid
 */
export const validateResourceId = (resourceId: string): void => {
  if (!resourceId || typeof resourceId !== 'string' || resourceId.trim().length === 0) {
    throw new GuildPassError('Invalid Resource ID', GuildPassErrorCode.INVALID_INPUT);
  }
};

/**
 * Validates a Role ID.
 * 
 * @param roleId The role ID to validate
 * @throws GuildPassError if the role ID is invalid
 */
export const validateRoleId = (roleId: string): void => {
  if (!roleId || typeof roleId !== 'string' || roleId.trim().length === 0) {
    throw new GuildPassError('Invalid Role ID', GuildPassErrorCode.INVALID_INPUT);
  }
};
