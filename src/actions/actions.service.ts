import { IActionsService } from './actions.service.interface';
import { AddActionDto } from './dto/add-action.dto';
import { Action } from './action.entity';
import { inject, injectable } from 'inversify';
import { Symbols } from '../symbols';
import { IActionsRepository } from './actions.repository.interface';
import { ActionModel } from '@prisma/client';
import { DeleteActionDto } from './dto/delete-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';

@injectable()
export class ActionsService implements IActionsService {
	constructor(@inject(Symbols.ActionsRepository) private actionsRepository: IActionsRepository) {}
	createAction = async ({
		title,
		text,
		startDay,
		endDay,
		city,
		tags,
		category,
	}: AddActionDto): Promise<ActionModel | null> => {
		const newAction = new Action(title, text, startDay, endDay, city, tags, category);
		const existedAction = await this.actionsRepository.find(title);
		if (existedAction) {
			return null;
		}
		return this.actionsRepository.create(newAction);
	};

	deleteAction = async ({ id }: DeleteActionDto): Promise<ActionModel | null> => {
		return this.actionsRepository.delete(id);
	};

	updateAction = async ({
		id,
		title,
		text,
		startDay,
		endDay,
		city,
		tags,
		category,
	}: UpdateActionDto): Promise<ActionModel> => {
		const updatedAction = new Action(title, text, startDay, endDay, city, tags, category);
		return this.actionsRepository.update(id, updatedAction);
	};
}
