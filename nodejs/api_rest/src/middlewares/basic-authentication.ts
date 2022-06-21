import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbiddenError";
import userRepository from "../repositories/userRepository";


async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'];
   
    if (!authHeader) {
     throw new ForbiddenError('Authentication required')
    }

    const [authType, token] = authHeader.split(' ');

    if(authType !== 'Basic' || !token) {
      throw new ForbiddenError('Authentication type invalid')
    }

    const tokenContent = Buffer.from(token, 'base64').toString('utf-8');
    const [userName, password] = tokenContent.split(':')

    if (!userName || password) {
      throw new ForbiddenError('Authentication not complete')
    }

    const user = await userRepository.findByUsernameAndPassword(userName, password)

    if (!userName) {
      throw new ForbiddenError('Incorrect user or password')
    }

    req.user = user;
    next();
  
  } catch (error) {
    next(error);
  }
}

export default basicAuthenticationMiddleware;