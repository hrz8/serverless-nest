import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  ValidationPipe as OriginalValidationPipe,
} from '@nestjs/common';
import {Injectable} from '@nestjs/common';
import { PayloadValidationError } from '../errors/common.error';

@Injectable()
export class ValidationPipe extends OriginalValidationPipe{
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      const finalValue = await super.transform(value, metadata);
      return finalValue;
    } catch (err) {
      if (err instanceof HttpException) {
        if (err.getStatus() === HttpStatus.BAD_REQUEST) {
          const response = err.getResponse() as {message: string};
          throw new PayloadValidationError(response.message);
        }
        throw err;
      }
    }
  }
}
