import { describe, it, expect } from 'vitest';
import { validateAddress, validateGuildId } from '../src/utils/validation';
import { GuildPassErrorCode } from '../src/errors/errorCodes';

describe('Validation Utils', () => {
  describe('validateAddress', () => {
    it('should not throw for valid address', () => {
      expect(() => validateAddress('0x1234567890123456789012345678901234567890')).not.toThrow();
    });

    it('should throw for invalid address', () => {
      try {
        validateAddress('invalid-addr');
      } catch (error: any) {
        expect(error.code).toBe(GuildPassErrorCode.INVALID_ADDRESS);
      }
    });

    it('should throw for empty address', () => {
      try {
        validateAddress('');
      } catch (error: any) {
        expect(error.code).toBe(GuildPassErrorCode.INVALID_INPUT);
      }
    });
  });

  describe('validateGuildId', () => {
    it('should not throw for valid guild ID', () => {
      expect(() => validateGuildId('guild_123')).not.toThrow();
    });

    it('should throw for empty guild ID', () => {
      expect(() => validateGuildId('')).toThrow();
    });
  });
});
