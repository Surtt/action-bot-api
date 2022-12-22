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
import { ReviewActionDto } from './dto/review-action.dto';
import { getStatus } from '../utils/getStatus';

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
				middlewares: [],
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
			{
				path: '/action',
				method: 'patch',
				func: this.reviewAction,
				middlewares: [new ValidateMiddleware(ReviewActionDto), new AuthGuard('admin')],
			},
		]);
	}
	getActions = async (
		{ user }: Request,
		res: Response,
		next: NextFunction,
	): Promise<void | null> => {
		const userInfo = await this.userService.getUserInfo(user.email);

		if (!userInfo) {
			return null;
		}

		const userRole = user.role;
		const userId = userInfo.id;
		const result = await this.actionsService.getActions(userId, userRole);
		const { actions }: any = result;
		const actionsData = userRole === 'admin' ? result : actions;
		this.ok(res, actionsData);
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

		const status = getStatus(user.role);

		const action = await this.actionsService.createAction({
			...body,
			status,
			authorId: userInfo?.id,
		});

		this.ok(res, action);
	};

	deleteAction = async (
		{ body }: Request<{}, {}, DeleteActionDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		await this.actionsService.deleteAction(body);
		this.ok(res, body.id);
	};

	updateAction = async (
		{ body }: Request<{}, {}, UpdateActionDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		await this.actionsService.updateAction(body);
		this.ok(res, body);
	};

	reviewAction = async (
		{ body }: Request<{}, {}, ReviewActionDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		await this.actionsService.reviewAction(body);
		this.ok(res, body);
	};
}
