import { JwtPayload } from 'jsonwebtoken';
//index 
declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Request {
      user: JwtPayload | null;
    }
  }
}
