import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common';
import { BaseError } from '~/src/base/base.error';

@Catch(BaseError)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: BaseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const errorCode = exception.getExceptionCode();

    const errorResponse = {
      code: exception.getStatusCode(),
      errorCode: errorCode,
      message: exception.message || null,
    };

    response.status(exception.getStatusCode()).json(errorResponse);
  }
}
