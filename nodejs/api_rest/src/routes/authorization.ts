import { NextFunction, Request, Response, Router } from 'express'
import ForbiddenError from '../models/errors/forbiddenError';
import userRepository from '../repositories/userRepository';
import JWT, { SignOptions } from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes';
import basicAuthenticationMiddleware from '../middlewares/basic-authentication';
import jwtAuthenticationMiddleware from '../middlewares/jwt-auth';

const authRoute = Router ();

authRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {

  try {
    
    const user = req.user;

    if (!user) {
      throw new ForbiddenError('User not informed')
    }

    const jwtPayload = { userName: user?.userName};
    const jwtOptions: SignOptions = { subject: user?.uuid, expiresIn: '15m' };
    const secretKey = 'xxxxxxx';
    const jwt = JWT.sign( jwtPayload, secretKey, jwtOptions);

    res.status(StatusCodes.OK).json( { token: jwt });

  } catch (error) {
    next(error);
  }

});

authRoute.post('/token/validate', jwtAuthenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(StatusCodes.OK)
})


export default authRoute;