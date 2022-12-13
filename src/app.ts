import express, { Express } from 'express';
import { Server } from 'http';
import { ILogger } from './logger/logger.interface';
import { UsersController } from './users/users.controller';
import { inject, injectable } from 'inversify';
import { Symbols } from './symbols';
import 'reflect-metadata';
import { IConfigService } from './config/config.service.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/auth.middleware';
import { ActionsController } from './actions/actions.controller';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(Symbols.ILogger) private logger: ILogger,
		@inject(Symbols.UserController) private userController: UsersController,
		@inject(Symbols.ActionsController) private actionsController: ActionsController,
		@inject(Symbols.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(Symbols.ConfigService) private configService: IConfigService,
		@inject(Symbols.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = Number(this.configService.get('PORT'));
	}

	useMiddleware(): void {
		this.app.use(express.json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute);
	}

	useRoutes(): void {
		this.app.use('/users/', this.userController.router);
		this.app.use('/actions', this.actionsController.router);
	}

	useExceptionFilter(): void {
		this.app.use(this.exceptionFilter.catch);
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilter();
		await this.prismaService.connect();
		if (process.env.NODE_ENV !== 'test') {
			this.server = this.app.listen(this.port);
		}
		this.logger.log(`Server: http://localhost:${this.port}`);
	}

	public close(): void {
		this.server.close();
	}
}
