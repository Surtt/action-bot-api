import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsString({ message: 'Name is not specified' })
	name: string;

	@IsEmail({}, { message: 'Email is incorrect' })
	email: string;

	@IsString({ message: 'Password is not specified' })
	password: string;
}
