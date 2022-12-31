import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserPasswordDto {
	@IsNumber()
	id: number;

	@IsString({ message: 'Password is not specified' })
	password: string;
}
