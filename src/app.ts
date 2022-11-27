import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { ILogger } from './logger/logger.interface';
import { UsersController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';

export class App {
	app: Express;
	server: Server;
	port: number;
	logger: ILogger;
	userController: UsersController;
	exceptionFilter: ExceptionFilter;

	constructor(
		logger: LoggerService,
		userController: UsersController,
		exceptionFilter: ExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
		this.logger = logger;
		this.userController = userController;
		this.exceptionFilter = exceptionFilter;
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
