import { IUsersService } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { inject, injectable } from 'inversify';
import { Symbols } from '../symbols';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UsersService implements IUsersService {
	constructor(@inject(Symbols.ConfigService) private configService: IConfigService) {}
	createUser = async ({ name, email, password }: UserRegisterDto): Promise<User | null> => {
		const newUser = new User(name, email);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		return null;
	};

	validateUser = async (dto: UserLoginDto): Promise<boolean> => {
		return true;
	};
}
