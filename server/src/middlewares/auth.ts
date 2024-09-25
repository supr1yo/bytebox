import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

 
interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ error: 'Authorization token is required.' });

    
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as JwtPayload;
    req.user = decoded.user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

export default authenticate;
