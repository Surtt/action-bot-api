import { ActionModel } from '@prisma/client';
import { Action } from './action.entity';

export interface IActionsRepository {
	create: (action: Action) => Promise<ActionModel>;
	find: (email: string) => Promise<ActionModel | null>;
}
