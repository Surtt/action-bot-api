import { ActionModel } from '@prisma/client';
import { AddActionDto } from './dto/add-action.dto';
import { DeleteActionDto } from './dto/delete-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { ReviewActionDto } from './dto/review-action.dto';

export interface IActionsService {
	getActions: (userId: number, userRole: string) => Promise<ActionModel[]>;
	createAction: (dto: AddActionDto) => Promise<ActionModel>;
	deleteAction: (dto: DeleteActionDto) => Promise<ActionModel>;
	updateAction: (dto: UpdateActionDto) => Promise<ActionModel>;
	reviewAction: (dto: ReviewActionDto) => Promise<ActionModel>;
	getActionInfo: (id: number) => Promise<ActionModel | null>;
}
