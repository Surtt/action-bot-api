import { ActionModel, UserModel } from '@prisma/client';
import { Action } from './action.entity';
import { TStatus } from '../../types';

export interface IActionsRepository {
	getActions: (
		userId: number,
		userRole: string,
	) => Promise<(UserModel & { actions: ActionModel[] }) | null | ActionModel[]>;
	create: (action: Action) => Promise<ActionModel>;
	delete: (id: number) => Promise<ActionModel>;
	update: (id: number, action: Action) => Promise<ActionModel>;
	review: (id: number, status: TStatus) => Promise<ActionModel>;
	find: (title: string) => Promise<ActionModel | null>;
	findById: (id: number) => Promise<ActionModel | null>;
}
