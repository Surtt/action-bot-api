import { IActionsRepository } from './actions.repository.interface';
import { Action } from './action.entity';
import { ActionModel, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { Symbols } from '../symbols';
import { PrismaService } from '../database/prisma.service';

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

	getActions = async (): Promise<ActionModel[]> => {
		return this.prismaService.client.actionModel.findMany();
	};
}
