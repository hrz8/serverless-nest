// deps
import { SNSEventRecord } from 'aws-lambda';

export const someFunction = async (
  payload: SNSEventRecord
): Promise<void> => {
  console.log(payload);
  console.log('Hello, from function!');
}

export const successCreated = async (
  payload: SNSEventRecord
): Promise<void> => {
  console.log(payload);
  console.log('Hello, from function!');
}
