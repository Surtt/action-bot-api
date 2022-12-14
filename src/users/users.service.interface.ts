import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserModel } from '@prisma/client';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

export interface IUsersService {
	getUsers: () => Promise<UserModel[]>;
	createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
	getUserInfo: (email: string) => Promise<UserModel | null>;
	deleteUser: (dto: DeleteUserDto) => Promise<UserModel>;
	updateUserPassword: (dto: UpdateUserPasswordDto) => Promise<UserModel>;
}
