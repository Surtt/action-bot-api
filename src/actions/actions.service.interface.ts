import { ActionModel } from '@prisma/client';
import { AddActionDto } from './dto/add-action.dto';
import { DeleteActionDto } from './dto/delete-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';

export interface IActionsService {
	getActions: () => Promise<ActionModel[]>;
	createAction: (dto: AddActionDto) => Promise<ActionModel | null>;
	deleteAction: (dto: DeleteActionDto) => Promise<ActionModel | null>;
	updateAction: (dto: UpdateActionDto) => Promise<ActionModel>;
}
