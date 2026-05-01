import { describe, it, expect } from 'vitest';
import { GuildPassError } from '../src/errors/GuildPassError';
import { GuildPassErrorCode } from '../src/errors/errorCodes';

describe('GuildPassError', () => {
  it('should create an error with correct properties', () => {
    const error = new GuildPassError('Test error', GuildPassErrorCode.INVALID_INPUT, 400, { foo: 'bar' });
    
    expect(error.message).toBe('Test error');
    expect(error.code).toBe(GuildPassErrorCode.INVALID_INPUT);
    expect(error.status).toBe(400);
    expect(error.details).toEqual({ foo: 'bar' });
    expect(error.name).toBe('GuildPassError');
  });

  it('should create from HTTP error status', () => {
    const error404 = GuildPassError.fromHttpError(404);
    expect(error404.code).toBe(GuildPassErrorCode.NOT_FOUND);
    
    const error401 = GuildPassError.fromHttpError(401);
    expect(error401.code).toBe(GuildPassErrorCode.UNAUTHORISED);
    
    const error500 = GuildPassError.fromHttpError(500);
    expect(error500.code).toBe(GuildPassErrorCode.HTTP_ERROR);
  });
});
