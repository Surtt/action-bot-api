import { IUsersService } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { inject, injectable } from 'inversify';
import { Symbols } from '../symbols';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { TRole } from '../../types';

@injectable()
export class UsersService implements IUsersService {
	constructor(
		@inject(Symbols.ConfigService) private configService: IConfigService,
		@inject(Symbols.UsersRepository) private usersRepository: IUsersRepository,
	) {}
	createUser = async ({
		name,
		email,
		role,
		password,
	}: UserRegisterDto): Promise<UserModel | null> => {
		const newUser = new User(name, email, role);
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
		const newUser = new User(
			existedUser.name,
			existedUser.email,
			existedUser.role as TRole,
			existedUser.password,
		);
		return newUser.comparePassword(password);
	};

	getUserInfo = async (email: string): Promise<UserModel | null> => {
		return this.usersRepository.find(email);
	};

	deleteUser = async ({ id }: DeleteUserDto): Promise<UserModel | null> => {
		return this.usersRepository.delete(id);
	};

	updateUserPassword = async ({
		id,
		password,
	}: UpdateUserPasswordDto): Promise<UserModel | null> => {
		const findUser = await this.usersRepository.findById(id);
		if (!findUser) {
			return null;
		}
		const updatedUser = new User(findUser.name, findUser.email, findUser.role as TRole);
		const salt = this.configService.get('SALT');
		await updatedUser.setPassword(password, Number(salt));
		return this.usersRepository.update(id, updatedUser);
	};

	getUsers = async (): Promise<UserModel[]> => {
		return this.usersRepository.getUsers();
	};
}
