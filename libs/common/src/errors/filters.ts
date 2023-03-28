import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';
import { instanceOfIError, RpcError } from './RpcError';
import { Response } from 'express';
import { ErrorStatus } from './constants';
import { baseGenerateHttpErrorCode } from './generators';

@Catch()
export class RpcCatchAllFilter implements ExceptionFilter {
  catch(exception: Error) {
    if (exception instanceof HttpException) {
      const exceptionData = exception.getResponse() as
        | { message?: string | string[] }
        | string;
      const exceptionMessage =
        typeof exceptionData === 'string'
          ? exceptionData
          : exceptionData.message?.toString() ?? exception.name;

      const err = {
        message: exceptionMessage,
        status: exception.getStatus(),
      };

      return throwError(() => err);
    }

    if (exception instanceof RpcException) {
      return throwError(() => exception.getError());
    }

    if (exception instanceof RpcError) {
      return throwError(() => ({
        status: exception.getStatus(),
        message: exception.getMessage(),
      }));
    }

    return throwError(() => ({
      status: 500,
      message: exception.message,
    }));
  }
}

@Catch()
export class HttpCatchAllFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log('catchAllfilter', exception);
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response.status(status).json(exception.getResponse());
      return;
    }

    if (instanceOfIError(exception)) {
      const err = baseGenerateHttpErrorCode(exception);
      response.status(err.getStatus()).json(err.getResponse());
      return;
    }

    if (exception instanceof RpcException) {
      const err = exception.getError();
      if (instanceOfIError(err)) {
        const httpErr = baseGenerateHttpErrorCode(err);
        response.status(httpErr.getStatus()).json(httpErr.getResponse());
        return;
      }
      response.status(ErrorStatus.internalServerError).json({
        statusCode: ErrorStatus.internalServerError,
        message: err.toString(),
      });
      return;
    }

    response.status(ErrorStatus.internalServerError).json({
      statusCode: ErrorStatus.internalServerError,
      message: exception.message,
    });
    return;
  }
}
