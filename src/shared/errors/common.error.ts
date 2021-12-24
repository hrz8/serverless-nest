import { HttpStatus } from "@nestjs/common";
import { BaseError, EExceptionCode } from "~/src/base/base.error";


export class PayloadValidationError extends BaseError {
  constructor(public message: string) {
    super(
      message,
      EExceptionCode.PAYLOAD_VALIDATION_FAIL,
      HttpStatus.BAD_REQUEST,
    );
  }
}
export class UnableToProceedError extends BaseError {
  constructor(public message: string) {
    super(
      message,
      EExceptionCode.UNABLE_TO_PROCEED,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class NoBranchFoundError extends BaseError {
  constructor(public message: string) {
    super(
      message,
      EExceptionCode.NO_BRANCH_FOUND,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class NoOrderFoundError extends BaseError {
  constructor(public message: string) {
    super(
      message,
      EExceptionCode.NOT_FOUND_ORDER,
      HttpStatus.NOT_FOUND
    );
  }
}

export class InvalidFeePayloadError extends BaseError {
  constructor(public message: string) {
    super(
      message,
      EExceptionCode.INVALID_FEE_PAYLOAD,
      HttpStatus.BAD_REQUEST
    );
  }
}

export class DeliveryExceedMaximalDistanceError extends BaseError {
  constructor(public message: string) {
    super(
      message,
      EExceptionCode.DELIVERY_EXCEED_MAXIMAL_DISTANCE,
      HttpStatus.BAD_REQUEST,
    );
  }
}
