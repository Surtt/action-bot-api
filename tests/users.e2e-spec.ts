import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e', () => {
	it('should be a registration error', async () => {
		const res = await request(application.app)
			.post('/users/register')
			.send({ email: 'a@a.com', password: '1' });
		expect(res.statusCode).toBe(422);
	});

	it('should login success', async () => {
		const result = await request(application.app)
			.post('/users/login')
			.send({ email: 'a@2a.ru', password: '2dsdfasdf' });
		expect(result.body.jwt).not.toBeUndefined();
	});

	it('should login error', async () => {
		const result = await request(application.app)
			.post('/users/login')
			.send({ email: 'a@2a.ru', password: '1' });
		expect(result.statusCode).toBe(401);
	});

	it('should get info success', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'a@2a.ru', password: '2dsdfasdf' });
		const result = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`);
		expect(result.body.email).toBe('a@2a.ru');
	});

	it('should get info error', async () => {
		const result = await request(application.app)
			.get('/users/info')
			.set('Authorization', 'Bearer 1');
		expect(result.statusCode).toBe(401);
	});
});
