import { AddActionDto } from './dto/add-action.dto';
import { ActionModel } from '@prisma/client';

export interface IActionsService {
	createAction: (dto: AddActionDto) => Promise<ActionModel | null>;
}
