import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';
import { ActionModel } from '@prisma/client';

let application: App;
let createdAction: request.Response;
let actionId: number;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
	createdAction = await request(application.app)
		.post('/actions/action')
		.send({
			title: 'React Query',
			text: 'React Query Course',
			startDay: '2022-12-12T14:21:00+02:00',
			endDay: '2023-01-01T14:21:00+02:00',
			city: 'Moscow',
			tags: ['React', 'JavaScript'],
			category: 'Courses',
			status: 'moderated',
		});
	const actions = await request(application.app).get('/actions/all-actions');
	actionId = actions.body.find((a: ActionModel) => a.title === createdAction.body.title)?.id;
});

describe('Actions e2e', () => {
	it('should update an action', async () => {
		const result = await request(application.app)
			.put('/actions/action')
			.send({
				id: actionId,
				title: 'Tanstack Query',
				text: 'React Query Course',
				startDay: '2023-12-12T14:21:00+02:00',
				endDay: '2024-01-01T14:21:00+02:00',
				city: 'Espoo',
				tags: ['React', 'JavaScript', 'React Query'],
				category: 'Courses',
				status: 'moderated',
			});
		expect(result.body.title).toBe('Tanstack Query');
	});

	it('Should change status', async () => {
		const result = await request(application.app)
			.patch('/actions/action')
			.send({ id: actionId, status: 'approved' });
		expect(result.body.status).toBe('approved');
	});
});

afterAll(async () => {
	await request(application.app)
		.delete('/actions/action')
		.send({
			id: actionId,
			title: 'Tanstack Query',
			text: 'React Query Course',
			startDay: '2022-12-12T14:21:00+02:00',
			endDay: '2023-01-01T14:21:00+02:00',
			city: 'Moscow',
			tags: ['React', 'JavaScript'],
			category: 'Courses',
			status: 'approved',
		});
});
