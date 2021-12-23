import {HttpStatus} from '@nestjs/common';

export enum EExceptionCode {
  PAYLOAD_VALIDATION_FAIL = 'EPDG000',
  UNABLE_TO_PROCEED = 'EPDG001',
  NO_BRANCH_FOUND = 'EPDG002',
  INVALID_FEE_PAYLOAD = 'EPDG003',
  NOT_FOUND_ORDER = 'EPDG004',
  DELIVERY_EXCEED_MAXIMAL_DISTANCE = 'EPDG005',
}

export class BaseError extends Error {
  private exceptionCode: EExceptionCode;
  private statusCode: HttpStatus;
  constructor(
    public message: string,
    exceptionCode: EExceptionCode,
    statusCode: HttpStatus,
  ) {
    super(message);
    this.exceptionCode = exceptionCode;
    this.statusCode = statusCode;
  }

  public getExceptionCode() {
    return this.exceptionCode;
  }

  public getStatusCode() {
    return this.statusCode;
  }
}
