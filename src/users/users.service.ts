import { IUsersService } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { inject, injectable } from 'inversify';
import { Symbols } from '../symbols';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
export class UsersService implements IUsersService {
	constructor(
		@inject(Symbols.ConfigService) private configService: IConfigService,
		@inject(Symbols.UsersRepository) private usersRepository: IUsersRepository,
	) {}
	createUser = async ({ name, email, password }: UserRegisterDto): Promise<UserModel | null> => {
		const newUser = new User(name, email);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		}
		return this.usersRepository.create(newUser);
	};

	validateUser = async ({ email, password }: UserLoginDto): Promise<boolean> => {
		const existedUser = await this.usersRepository.find(email);
		if (!existedUser) {
			return false;
		}
		const newUser = new User(existedUser.name, existedUser.email, existedUser.password);
		return newUser.comparePassword(password);
	};
}
