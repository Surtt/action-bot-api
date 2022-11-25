import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';

export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(private logger: LoggerService) {
		this.app = express();
		this.port = 8000;
	}

	public async init(): Promise<void> {
		this.server = this.app.listen(this.port);
		this.logger.log(`Server: http://localhost:${this.port}`);
	}
}
