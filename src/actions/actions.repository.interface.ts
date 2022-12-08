import { ActionModel } from '@prisma/client';
import { Action } from './action.entity';

export interface IActionsRepository {
	create: (action: Action) => Promise<ActionModel>;
	delete: (id: number) => Promise<ActionModel>;
	find: (title: string) => Promise<ActionModel | null>;
}
