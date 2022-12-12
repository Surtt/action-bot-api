import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { Symbols } from './symbols';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IUserController } from './users/users.controller.interface';
import Bind = interfaces.Bind;
import { IUsersService } from './users/users.service.interface';
import { UsersService } from './users/users.service';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { IUsersRepository } from './users/users.repository.interface';
import { UsersRepository } from './users/users.repository';

export interface IBootstrapReturn {
	container: Container;
	app: App;
}

const appBindings = new ContainerModule((bind: Bind) => {
	bind<ILogger>(Symbols.ILogger).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(Symbols.ExceptionFilter).to(ExceptionFilter);
	bind<IUserController>(Symbols.UserController).to(UsersController);
	bind<IUsersService>(Symbols.UserService).to(UsersService);
	bind<PrismaService>(Symbols.PrismaService).to(PrismaService).inSingletonScope();
	bind<IConfigService>(Symbols.ConfigService).to(ConfigService).inSingletonScope();
	bind<IUsersRepository>(Symbols.UsersRepository).to(UsersRepository).inSingletonScope();
	bind<App>(Symbols.Application).to(App);
});

const bootstrap = async (): Promise<IBootstrapReturn> => {
	const container = new Container();
	container.load(appBindings);
	const app = container.get<App>(Symbols.Application);
	await app.init();
	return { app, container };
};

export const boot = bootstrap();
