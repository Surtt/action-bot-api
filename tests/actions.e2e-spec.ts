import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';
import { ActionModel } from '@prisma/client';

let application: App;
let createdAction: request.Response;
let actionId: number;
let jwt: string;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
	const login = await request(application.app)
		.post('/users/login')
		.send({ email: 'amanda@mail.com', password: '11223344' });
	jwt = login.body.jwt;
	createdAction = await request(application.app)
		.post('/actions/action')
		.set('Authorization', `Bearer ${login.body.jwt}`)
		.send({
			title: 'Ramda',
			text: 'RamdaCourse',
			startDay: '2022-12-12T14:21:00+02:00',
			endDay: '2023-01-01T14:21:00+02:00',
			city: 'Moscow',
			tags: ['Ramda', 'JavaScript'],
			category: 'Courses',
			status: 'moderated',
		});

	const actions = await request(application.app)
		.get('/actions/all-actions')
		.set('Authorization', `Bearer ${login.body.jwt}`);
	actionId = actions.body.find((a: ActionModel) => a.title === createdAction.body.title)?.id;
});

describe('Actions e2e', () => {
	it('should update an action', async () => {
		const result = await request(application.app)
			.put('/actions/action')
			.set('Authorization', `Bearer ${jwt}`)
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
			.set('Authorization', `Bearer ${jwt}`)
			.send({ id: actionId, status: 'rejected' });
		expect(result.body.status).toBe('rejected');
	});
});

afterAll(async () => {
	await request(application.app)
		.delete('/actions/action')
		.set('Authorization', `Bearer ${jwt}`)
		.send({
			id: actionId,
		});
});
