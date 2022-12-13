import { ActionModel } from '@prisma/client';
import { Action } from './action.entity';

export interface IActionsRepository {
	getActions: () => Promise<ActionModel[]>;
	create: (action: Action) => Promise<ActionModel>;
	delete: (id: number) => Promise<ActionModel>;
	update: (id: number, action: Action) => Promise<ActionModel>;
	find: (title: string) => Promise<ActionModel | null>;
}
