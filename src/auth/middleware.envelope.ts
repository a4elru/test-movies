import { Request, Response, NextFunction } from 'express';
import { BaseResponseBodyCRdto } from './dto.response.base-obj';

export function addEnvelope(
  req: Request,
  res: ResponseWithEnvelope,
  next: NextFunction,
) {
  res.envelope = envelope;
  next();
}

export interface ResponseWithEnvelope extends Response {
  envelope: (jsonObj: BaseResponseBodyCRdto) => any;
}

function envelope(jsonObj: BaseResponseBodyCRdto) {
  return this.status(jsonObj.statusCode).json(jsonObj);
}
