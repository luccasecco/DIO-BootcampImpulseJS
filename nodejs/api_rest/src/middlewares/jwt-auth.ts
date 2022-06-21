import { NextFunction, Response, Request } from "express";
import ForbiddenError from "../models/errors/forbiddenError";
import JWT from 'jsonwebtoken'
import userRepository from "../repositories/userRepository";
import { type } from "os";


async function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    
    const authHeader = req.headers['authorization']

    if(!authHeader) {
      throw new ForbiddenError('Authentication required')
    }

    const [authType, token] = authHeader.split(' ');

    if (authType !== 'Bearer' || !token) {
      throw new ForbiddenError('Invalid authentication')
    }

    try {
      const secretKey = 'my_secret_key'
      const tokenPayload = JWT.verify(token, secretKey)
  
  
      if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
        throw new ForbiddenError('Invalid token')
      }
  
      const user = {
        uuid: tokenPayload.sub,
        userName: tokenPayload.username
      };
      
      req.user = user;
          
      next();
      
    } catch (error) {
      throw new ForbiddenError('Invalid token')
    }

  } catch (error) {
    next(error);
  }
}

export default jwtAuthenticationMiddleware;