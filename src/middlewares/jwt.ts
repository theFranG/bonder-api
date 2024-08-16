
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret = process.env.JWT_SECRET || '846531';
export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers["authorization"]?.split(" ")[1];
    let jwtPayload;
  
    try {
      jwtPayload = <any>jwt.verify(token, secret);
      res.locals.jwtPayload = jwtPayload;
    } catch (e) {
      return res.status(401).json({ message: "The token provided is invalid" });
    }
  
    const { userId, username } = jwtPayload;
  
    const newToken = jwt.sign({ userId, username }, secret, {
      expiresIn: "1h",
    });
    res.setHeader("token", newToken);
    // Call next
    next();
  };
  
