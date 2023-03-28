import { RpcException } from '@nestjs/microservices';

export const usecaseErrorHandler = (error: any, errorMessage: string) => {
  if (error instanceof RpcException) {
    throw new RpcException(error.getError());
  }

  const message =
    error?.message?.length && error.message.length < 100
      ? error.message
      : errorMessage;

  throw new RpcException({
    status: error.status || 500,
    message,
  });
};
