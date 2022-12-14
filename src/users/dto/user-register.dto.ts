import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsString({ message: 'Name is not specified' })
	name: string;

	@IsEmail({}, { message: 'Email is incorrect' })
	email: string;

	@IsOptional()
	@IsNotEmpty()
	@IsString({ message: 'Role is not specified' })
	role?: string;

	@IsString({ message: 'Password is not specified' })
	password: string;
}
