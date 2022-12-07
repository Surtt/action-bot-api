import { IActionsService } from './actions.service.interface';
import { AddActionDto } from './dto/add-action.dto';
import { Action } from './action.entity';
import { inject, injectable } from 'inversify';
import { Symbols } from '../symbols';
import { IActionsRepository } from './actions.repository.interface';
import { ActionModel } from '@prisma/client';

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
}
