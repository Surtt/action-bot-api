import { AddActionDto } from './dto/add-action.dto';
import { Action } from './action.entity';

export interface IActionsService {
	createAction: (dto: AddActionDto) => Promise<Action>;
}
