import {
  BadRequestException,
  ConflictException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorStatus } from './constants';
import { IError } from './RpcError';

export const baseGenerateHttpErrorCode = (
  err: IError,
  isBadRequestByDefault = false,
) => {
  let error: HttpException;
  const errMessage = err.message;
  switch (err.status) {
    case ErrorStatus.badRequest:
      error = new BadRequestException(errMessage);
      break;

    case ErrorStatus.unauthorized:
      error = new UnauthorizedException(errMessage);
      break;

    case ErrorStatus.notFound:
      error = new NotFoundException(errMessage);
      break;

    case ErrorStatus.conflict:
      error = new ConflictException(errMessage);
      break;

    case ErrorStatus.internalServerError:
      error = new InternalServerErrorException(errMessage);
      break;

    default:
      error = isBadRequestByDefault
        ? new BadRequestException(`${err.status}` || errMessage || '')
        : new InternalServerErrorException(errMessage);
      break;
  }

  return error;
};
