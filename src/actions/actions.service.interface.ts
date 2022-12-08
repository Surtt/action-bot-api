import { AddActionDto } from './dto/add-action.dto';
import { ActionModel } from '@prisma/client';
import { DeleteActionDto } from './dto/delete-action.dto';

export interface IActionsService {
	createAction: (dto: AddActionDto) => Promise<ActionModel | null>;
	deleteAction: (dto: DeleteActionDto) => Promise<ActionModel | null>;
}
