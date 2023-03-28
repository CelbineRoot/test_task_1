import { ErrorStatus, validErrorStatus } from './constants';

export interface IError {
  status: ErrorStatus;
  message: string;
  data?: any;
}

export class RpcError extends Error implements IError {
  public status: ErrorStatus;
  public message: string;
  public data: any;

  public constructor(error: IError) {
    super();
    this.status = error.status;
    this.message = error.message;

    if (error.data) {
      this.data = error.data;
    }
  }

  public getStatus(): ErrorStatus {
    return this.status;
  }

  public getMessage(): string {
    return this.message;
  }

  // 4xx

  public static BadRequest<Data>(message: string, data?: Data) {
    return new RpcError({ status: ErrorStatus.badRequest, message, data });
  }

  public static Unauthorized<Data>(message: string, data?: Data) {
    return new RpcError({ status: ErrorStatus.unauthorized, message, data });
  }

  public static NotFound<Data>(message: string, data?: Data) {
    return new RpcError({ status: ErrorStatus.notFound, message, data });
  }

  public static NotAcceptable<Data>(message: string, data?: Data) {
    return new RpcError({
      status: ErrorStatus.notAcceptable,
      message,
      data,
    });
  }

  public static Conflict<Data>(message: string, data?: Data) {
    return new RpcError({ status: ErrorStatus.conflict, message, data });
  }

  public static PreconditionFailed<Data>(message: string, data?: Data) {
    return new RpcError({
      status: ErrorStatus.preconditionFailed,
      message,
      data,
    });
  }

  // 5xx

  public static InternalServerError<Data>(message: string, data?: Data) {
    return new RpcError({
      status: ErrorStatus.internalServerError,
      message,
      data,
    });
  }
}

RpcError.prototype.name = 'RpcError';

export const instanceOfIError = (obj: any): obj is IError =>
  obj &&
  obj.message &&
  typeof obj.message === 'string' &&
  obj.status &&
  typeof obj.status === 'number' &&
  validErrorStatus.includes(obj.status);
