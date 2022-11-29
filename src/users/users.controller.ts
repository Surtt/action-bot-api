import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { Symbols } from '../symbols';
import 'reflect-metadata';

@injectable()
export class UsersController extends BaseController {
	constructor(@inject(Symbols.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.routes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
			},
		]);
	}

	login = (req: Request, res: Response, next: NextFunction): void => {
		next(new HTTPError(401, 'Authorization error'));
	};

	register = (req: Request, res: Response, next: NextFunction): void => {
		this.ok(res, 'register');
	};
}
