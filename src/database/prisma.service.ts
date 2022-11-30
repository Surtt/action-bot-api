import { inject, injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { Symbols } from '../symbols';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(Symbols.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	connect = async (): Promise<void> => {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] Successful connection to the database');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.log(`[PrismaService] Database connection error ${e.message}`);
			}
		}
	};

	disconnect = async (): Promise<void> => {
		await this.client.$disconnect();
	};
}
