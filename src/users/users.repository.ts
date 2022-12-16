import { IUsersRepository } from './users.repository.interface';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { Symbols } from '../symbols';
import { PrismaService } from '../database/prisma.service';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(Symbols.PrismaService) private prismaService: PrismaService) {}
	async create({ name, email, role, password }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				name,
				email,
				role,
				password,
			},
		});
	}

	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}

	findById = async (id: number): Promise<UserModel | null> => {
		return this.prismaService.client.userModel.findUnique({
			where: {
				id,
			},
		});
	};

	delete = async (id: number): Promise<UserModel> => {
		return this.prismaService.client.userModel.delete({ where: { id } });
	};

	update = async (id: number, { password }: User): Promise<UserModel> => {
		return this.prismaService.client.userModel.update({
			where: {
				id,
			},
			data: {
				password,
			},
		});
	};

	getUsers = async (): Promise<UserModel[]> => {
		return this.prismaService.client.userModel.findMany();
	};
}
