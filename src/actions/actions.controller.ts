import { IActionsController } from './actions.controller.interface';
import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../common/base.controller';
import { inject, injectable } from 'inversify';
import { Symbols } from '../symbols';
import { ILogger } from '../logger/logger.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import { AddActionDto } from './dto/add-action.dto';
import { IActionsService } from './actions.service.interface';

@injectable()
export class ActionsController extends BaseController implements IActionsController {
	constructor(
		@inject(Symbols.ILogger) private loggerService: ILogger,
		@inject(Symbols.ActionsService) private actionsService: IActionsService,
	) {
		super(loggerService);
		this.routes([
			{
				path: '/all-actions',
				method: 'get',
				func: this.getActions,
			},
			{
				path: '/action',
				method: 'post',
				func: this.addAction,
				middlewares: [new ValidateMiddleware(AddActionDto)],
			},
			{
				path: '/action',
				method: 'delete',
				func: this.deleteAction,
			},
			{
				path: '/action',
				method: 'put',
				func: this.updateAction,
			},
		]);
	}
	getActions = (req: Request, res: Response, next: NextFunction): void => {
		this.ok(res, 'all actions');
	};

	addAction = async (
		{ body }: Request<{}, {}, AddActionDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		const action = await this.actionsService.createAction(body);
		console.log(action);
		this.ok(res, 'add action');
	};

	deleteAction(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'delete action');
	}

	updateAction(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'update action');
	}
}
