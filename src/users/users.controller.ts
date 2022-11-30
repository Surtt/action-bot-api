import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { Symbols } from '../symbols';
import 'reflect-metadata';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';
import { IUserController } from './users.controller.interface';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UsersController extends BaseController implements IUserController {
	constructor(
		@inject(Symbols.ILogger) private loggerService: ILogger,
		@inject(Symbols.UserService) private usersService: IUsersService,
	) {
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
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
		]);
	}

	login = async (
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		console.log(req.body);
		next(new HTTPError(401, 'Authorization error'));
	};

	register = async (
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		const user = await this.usersService.createUser(body);
		if (!user) {
			return next(new HTTPError(422, 'This user already exists'));
		}
		this.ok(res, { name: user.name, email: user.email });
	};
}
