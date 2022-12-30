import { IActionsService } from './actions.service.interface';
import { AddActionDto } from './dto/add-action.dto';
import { Action } from './action.entity';
import { inject, injectable } from 'inversify';
import { Symbols } from '../symbols';
import { IActionsRepository } from './actions.repository.interface';
import { ActionModel } from '@prisma/client';
import { DeleteActionDto } from './dto/delete-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { ReviewActionDto } from './dto/review-action.dto';

@injectable()
export class ActionsService implements IActionsService {
	constructor(@inject(Symbols.ActionsRepository) private actionsRepository: IActionsRepository) {}
	createAction = async (dto: AddActionDto): Promise<ActionModel> => {
		const newAction = new Action(dto);

		return this.actionsRepository.create(newAction);
	};

	deleteAction = async ({ id }: DeleteActionDto): Promise<ActionModel> => {
		return this.actionsRepository.delete(id);
	};

	updateAction = async (dto: UpdateActionDto): Promise<ActionModel> => {
		const updatedAction = new Action(dto);
		return this.actionsRepository.update(dto.id, updatedAction);
	};

	reviewAction = async ({ id, status }: ReviewActionDto): Promise<ActionModel> => {
		return this.actionsRepository.review(id, status);
	};

	getActions = async (userId: number, userRole: string): Promise<ActionModel[]> => {
		if (userRole === 'admin') {
			return this.actionsRepository.getActions();
		} else {
			return this.actionsRepository.getProvidersActions(userId);
		}
	};

	getActionInfo = async (id: number): Promise<ActionModel | null> => {
		return this.actionsRepository.findById(id);
	};
}
