import { IMiddleware } from './middleware.interface';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	execute = (req: Request, res: Response, next: NextFunction): void => {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			verify(token, this.secret, (err, payload) => {
				if (err) {
					return next();
				} else if (typeof payload !== 'string' && payload !== undefined) {
					req.user = {
						email: payload.email,
						role: payload.role,
					};
					return next();
				}
			});
		} else {
			return next();
		}
	};
}
