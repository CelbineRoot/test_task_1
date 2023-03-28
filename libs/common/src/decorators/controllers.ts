import {
  applyDecorators,
  Controller,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RpcCatchAllFilter } from '../errors';

export const MicroserviceController = () => {
  return applyDecorators(
    UseFilters(new RpcCatchAllFilter()),
    UsePipes(
      new ValidationPipe({ transform: true, forbidNonWhitelisted: true }),
    ),
    Controller(),
  );
};
