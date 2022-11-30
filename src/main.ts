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

const appBindings = new ContainerModule((bind: Bind) => {
	bind<ILogger>(Symbols.ILogger).to(LoggerService);
	bind<IExceptionFilter>(Symbols.ExceptionFilter).to(ExceptionFilter);
	bind<IUserController>(Symbols.UserController).to(UsersController);
	bind<IUsersService>(Symbols.UserService).to(UsersService);
	bind<App>(Symbols.Application).to(App);
});

const bootstrap = () => {
	const container = new Container();
	container.load(appBindings);
	const app = container.get<App>(Symbols.Application);
	app.init();
	return { app, container };
};

export const { app, container } = bootstrap();
