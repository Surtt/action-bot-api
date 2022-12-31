import { UserModel } from '@prisma/client';
import { User } from './user.entity';

export interface IUsersRepository {
	getUsers: () => Promise<UserModel[]>;
	create: (user: User) => Promise<UserModel>;
	delete: (id: number) => Promise<UserModel>;
	update: (id: number, user: User) => Promise<UserModel>;
	find: (email: string) => Promise<UserModel | null>;
	findById: (id: number) => Promise<UserModel | null>;
}
