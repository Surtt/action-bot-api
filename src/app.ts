import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { ILogger } from './logger/logger.interface';
import { UsersController } from './users/users.controller';

export class App {
	app: Express;
	server: Server;
	port: number;
	logger: ILogger;
	userController: UsersController;

	constructor(logger: LoggerService, userController: UsersController) {
		this.app = express();
		this.port = 8000;
		this.logger = logger;
		this.userController = userController;
	}

	useRoutes(): void {
		this.app.use('/users/', this.userController.router);
	}

	public async init(): Promise<void> {
		this.server = this.app.listen(this.port);
		this.useRoutes();
		this.logger.log(`Server: http://localhost:${this.port}`);
	}
}
