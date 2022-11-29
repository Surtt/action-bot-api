import express, { Express } from 'express';
import { Server } from 'http';
import { ILogger } from './logger/logger.interface';
import { UsersController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { inject, injectable } from 'inversify';
import { Symbols } from './symbols';
import 'reflect-metadata';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(Symbols.ILogger) private logger: ILogger,
		@inject(Symbols.UserController) private userController: UsersController,
		@inject(Symbols.ExceptionFilter) private exceptionFilter: ExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useRoutes(): void {
		this.app.use('/users/', this.userController.router);
	}

	useExceptionFilter() {
		this.app.use(this.exceptionFilter.catch);
	}

	public async init(): Promise<void> {
		this.useRoutes();
		this.useExceptionFilter();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server: http://localhost:${this.port}`);
	}
}
