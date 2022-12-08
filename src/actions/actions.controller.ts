import { IActionsController } from './actions.controller.interface';
import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../common/base.controller';
import { inject, injectable } from 'inversify';
import { Symbols } from '../symbols';
import { ILogger } from '../logger/logger.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import { AddActionDto } from './dto/add-action.dto';
import { IActionsService } from './actions.service.interface';
import { HTTPError } from '../errors/http-error.class';
import { DeleteActionDto } from './dto/delete-action.dto';

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
		if (!action?.title) {
			return next(new HTTPError(422, 'This action already exists'));
		}
		this.ok(res, body);
	};

	deleteAction = async (
		{ body }: Request<{}, {}, DeleteActionDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		await this.actionsService.deleteAction(body);
		this.ok(res, body.id);
	};

	updateAction(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'update action');
	}
}
