import { Request, Response, NextFunction } from 'express';
import { IResponseCRdto } from './dto.out.to.response';

export function addEnvelope(
  req: Request,
  res: ResponseWithEnvelope,
  next: NextFunction,
) {
  res.envelope = envelope;
  next();
}

/**
 * @prop **envelope**: *(jsonObj: IResponseCRdto) => any*
 * @extends Response {@link Response}
 */
export interface ResponseWithEnvelope extends Response {
  envelope: (jsonObj: IResponseCRdto) => any;
}

function envelope(jsonObj: IResponseCRdto) {
  return this.status(jsonObj.statusCode).json(jsonObj);
}
