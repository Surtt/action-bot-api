import { IConfigService } from './config.service.interface';
import { inject, injectable } from 'inversify';
import { Symbols } from '../symbols';
import { ILogger } from '../logger/logger.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';

@injectable()
export class ConfigService implements IConfigService {
	private readonly config: DotenvParseOutput;
	constructor(@inject(Symbols.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();

		if (result.error) {
			this.logger.error('[ConfigService] The .env file could not be read or is missing');
		} else {
			this.logger.log('[ConfigService] Configuration loaded');
			this.config = result.parsed as DotenvParseOutput;
		}
	}
	get(key: string): string {
		return this.config[key];
	}
}
