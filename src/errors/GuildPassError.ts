import { GuildPassErrorCode } from './errorCodes';

export class GuildPassError extends Error {
  public readonly code: GuildPassErrorCode;
  public readonly status?: number;
  public readonly details?: any;

  constructor(message: string, code: GuildPassErrorCode, status?: number, details?: any) {
    super(message);
    this.name = 'GuildPassError';
    this.code = code;
    this.status = status;
    this.details = details;

    // Fix for inheritance in TypeScript when targeting ES5 or lower
    Object.setPrototypeOf(this, GuildPassError.prototype);
  }

  public static fromHttpError(status: number, details?: any): GuildPassError {
    let code = GuildPassErrorCode.HTTP_ERROR;
    let message = `HTTP Error: ${status}`;

    if (status === 401 || status === 403) {
      code = GuildPassErrorCode.UNAUTHORISED;
      message = 'Unauthorised access';
    } else if (status === 404) {
      code = GuildPassErrorCode.NOT_FOUND;
      message = 'Resource not found';
    }

    return new GuildPassError(message, code, status, details);
  }
}
