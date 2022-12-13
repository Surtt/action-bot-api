import { IMiddleware } from './middleware.interface';
import { Request, Response, NextFunction } from 'express';

export class AuthGuard implements IMiddleware {
	constructor(private role: string) {}
	execute = (req: Request, res: Response, next: NextFunction): void => {
		if (req.user) {
			if (req.user.role === this.role) {
				return next();
			} else {
				res.status(403).send({ error: 'Access denied ' });
			}
		} else {
			res.status(401).send({ error: 'Not authorized' });
		}
	};
}
