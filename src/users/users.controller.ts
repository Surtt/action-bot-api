import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { Symbols } from '../symbols';
import 'reflect-metadata';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUsersService } from './users.service.interface';
import { IUserController } from './users.controller.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { AuthGuard } from '../common/auth.guard';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@injectable()
export class UsersController extends BaseController implements IUserController {
	constructor(
		@inject(Symbols.ILogger) private loggerService: ILogger,
		@inject(Symbols.UserService) private usersService: IUsersService,
		@inject(Symbols.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.routes([
			{
				path: '/all-users',
				method: 'get',
				func: this.getUsers,
				middlewares: [new AuthGuard('admin')],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/provider',
				method: 'post',
				func: this.registerProvider,
				middlewares: [new ValidateMiddleware(UserRegisterDto), new AuthGuard('admin')],
			},
			{
				path: '/provider',
				method: 'delete',
				func: this.deleteUser,
				middlewares: [new ValidateMiddleware(DeleteUserDto), new AuthGuard('admin')],
			},
			{
				path: '/provider',
				method: 'patch',
				func: this.updateUser,
				middlewares: [new ValidateMiddleware(UpdateUserPasswordDto), new AuthGuard('admin')],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new AuthGuard('admin')],
			},
		]);
	}

	getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const users = await this.usersService.getUsers();
		const result = users
			.filter(({ isDeleted }) => !isDeleted)
			.map(({ id, name, email, role }) => ({ id, name, email, role }));
		this.ok(res, result);
	};

	login = async (
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		const user = await this.usersService.validateUser(body);
		if (!user) {
			return next(new HTTPError(401, 'Authorization error'));
		}
		const userData = await this.usersService.getUserInfo(body.email);
		const jwt = await this.signJWT(
			body.email,
			userData?.role as string,
			this.configService.get('SECRET'),
		);
		this.ok(res, { jwt });
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
		this.ok(res, {
			name: user.name,
			email: user.email,
			role: user.role,
		});
	};

	registerProvider = async (
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		const user = await this.usersService.createUser(body);
		if (!user) {
			return next(new HTTPError(422, 'This provider already exists'));
		}
		this.ok(res, { name: user.name, email: user.email, role: user.role });
	};

	deleteUser = async (
		{ body }: Request<{}, {}, DeleteUserDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		await this.usersService.deleteUser(body);
		this.ok(res, body.id);
	};

	updateUser = async ({ body }: Request, res: Response, next: NextFunction): Promise<void> => {
		const user = await this.usersService.updateUserPassword(body);
		if (user) {
			this.ok(res, { name: user.name, email: user.email, role: user.role });
		}
	};

	info = async ({ user }: Request, res: Response, next: NextFunction): Promise<void> => {
		const userInfo = await this.usersService.getUserInfo(user.email);
		this.ok(res, { id: userInfo?.id, email: userInfo?.email, role: userInfo?.role });
	};

	private signJWT = async (email: string, role: string, secret: string): Promise<string> => {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					role,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				},
			);
		});
	};
}
