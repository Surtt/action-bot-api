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
import { UpdateActionDto } from './dto/update-action.dto';
import { AuthGuard } from '../common/auth.guard';
import { IUsersService } from '../users/users.service.interface';

@injectable()
export class ActionsController extends BaseController implements IActionsController {
	constructor(
		@inject(Symbols.ILogger) private loggerService: ILogger,
		@inject(Symbols.ActionsService) private actionsService: IActionsService,
		@inject(Symbols.UserService) private userService: IUsersService,
	) {
		super(loggerService);
		this.routes([
			{
				path: '/all-actions',
				method: 'get',
				func: this.getActions,
				middlewares: [new AuthGuard('admin')],
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
				middlewares: [new ValidateMiddleware(DeleteActionDto), new AuthGuard('admin')],
			},
			{
				path: '/action',
				method: 'put',
				func: this.updateAction,
				middlewares: [new ValidateMiddleware(UpdateActionDto), new AuthGuard('admin')],
			},
		]);
	}
	getActions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const result = await this.actionsService.getActions();
		this.ok(res, result);
	};

	addAction = async (
		{ body, user }: Request<{}, {}, AddActionDto>,
		res: Response,
		next: NextFunction,
	): Promise<void | null> => {
		const userInfo = await this.userService.getUserInfo(user.email);

		if (!userInfo) {
			return null;
		}
		const status = user.role === 'admin' ? 'approved' : 'moderated';
		const action = await this.actionsService.createAction({
			...body,
			status,
			authorId: userInfo?.id,
		});
		if (!action?.title) {
			return next(new HTTPError(422, 'This action already exists'));
		}

		this.ok(res, { ...body, status, authorId: userInfo.id });
	};

	deleteAction = async (
		{ body }: Request<{}, {}, DeleteActionDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		await this.actionsService.deleteAction(body);
		this.ok(res, body.id);
	};

	updateAction = async ({ body }: Request, res: Response, next: NextFunction): Promise<void> => {
		await this.actionsService.updateAction(body);
		this.ok(res, body);
	};
}
