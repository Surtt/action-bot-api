import { ActionModel } from '@prisma/client';
import { Action } from './action.entity';
import { TStatus, TUsersActions } from '../types';

export interface IActionsRepository {
	getActions: () => Promise<TUsersActions>;
	getProvidersActions: (userId: number) => Promise<TUsersActions>;
	create: (action: Action) => Promise<ActionModel>;
	delete: (id: number) => Promise<ActionModel>;
	update: (id: number, action: Action) => Promise<ActionModel>;
	review: (id: number, status: TStatus) => Promise<ActionModel>;
	find: (title: string) => Promise<ActionModel | null>;
	findById: (id: number) => Promise<ActionModel | null>;
}
