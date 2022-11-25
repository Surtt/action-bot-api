import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { NextFunction, Request, Response } from 'express';

export class UsersController extends BaseController {
	constructor(logger: ILogger) {
		super(logger);
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
		this.ok(res, 'login');
	};

	register = (req: Request, res: Response, next: NextFunction): void => {
		this.ok(res, 'register');
	};
}
