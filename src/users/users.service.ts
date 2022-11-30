import { IUsersService } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { injectable } from 'inversify';

@injectable()
export class UsersService implements IUsersService {
	createUser = async ({ name, email, password }: UserRegisterDto): Promise<User | null> => {
		const newUser = new User(name, email);
		await newUser.setPassword(password);
		return null;
	};

	validateUser = async (dto: UserLoginDto): Promise<boolean> => {
		return true;
	};
}
