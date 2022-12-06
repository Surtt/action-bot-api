import { IActionsService } from './actions.service.interface';
import { AddActionDto } from './dto/add-action.dto';
import { Action } from './action.entity';
import { injectable } from 'inversify';

@injectable()
export class ActionsService implements IActionsService {
	createAction = async ({
		title,
		text,
		startDay,
		endDay,
		city,
		tags,
		category,
	}: AddActionDto): Promise<Action> => {
		const newAction = new Action(title, text, startDay, endDay, city, tags, category);
		return newAction;
	};
}
