import { IActionsRepository } from './actions.repository.interface';
import { Action } from './action.entity';
import { ActionModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { Symbols } from '../symbols';
import { PrismaService } from '../database/prisma.service';
import { TStatus, TUsersActions } from '../types';

@injectable()
export class ActionsRepository implements IActionsRepository {
	constructor(@inject(Symbols.PrismaService) private prismaService: PrismaService) {}
	create = async ({
		title,
		text,
		startDay,
		endDay,
		city,
		tags,
		category,
		status,
		authorId,
	}: Action): Promise<ActionModel> => {
		return this.prismaService.client.actionModel.create({
			data: {
				title,
				text,
				startDay,
				endDay,
				city,
				tags,
				category,
				status,
				authorId,
			},
		});
	};

	find = async (title: string): Promise<ActionModel | null> => {
		return this.prismaService.client.actionModel.findFirst({
			where: {
				title,
			},
		});
	};

	findById = async (id: number): Promise<ActionModel | null> => {
		return this.prismaService.client.actionModel.findUnique({
			where: {
				id,
			},
		});
	};

	delete = (id: number): Promise<ActionModel> => {
		return this.prismaService.client.actionModel.delete({ where: { id } });
	};

	update = async (
		id: number,
		{ title, text, startDay, endDay, city, tags, category }: Action,
	): Promise<ActionModel> => {
		return this.prismaService.client.actionModel.update({
			where: {
				id,
			},
			data: {
				title,
				text,
				startDay,
				endDay,
				city,
				tags,
				category,
			},
		});
	};

	review = async (id: number, status: TStatus): Promise<ActionModel> => {
		return this.prismaService.client.actionModel.update({
			where: {
				id,
			},
			data: {
				status,
			},
		});
	};

	getActions = async (): Promise<TUsersActions> => {
		return this.prismaService.client.actionModel.findMany();
	};

	getProvidersActions = async (userId: number) => {
		return this.prismaService.client.userModel.findUnique({
			where: {
				id: userId,
			},
			include: {
				actions: true,
			},
		});
	};
}
