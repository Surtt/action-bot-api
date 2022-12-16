import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';
import { UserModel } from '@prisma/client';

let application: App;
let createdUser: request.Response;
let providerId: number;
let jwt: string;

beforeAll(async () => {
	const { app } = await boot;
	application = app;

	// createdUser = await request(application.app).post('/users/register').send({
	// 	name: 'Amanda',
	// 	email: 'amanda@mail.com',
	// 	password: '11223344',
	// });
});

describe('Users e2e', () => {
	it('should be a registration error', async () => {
		const res = await request(application.app)
			.post('/users/register')
			.send({ email: 'amanda@mail.com', password: '1' });
		expect(res.statusCode).toBe(422);
	});

	it('should login success', async () => {
		const result = await request(application.app)
			.post('/users/login')
			.send({ email: 'amanda@mail.com', password: '11223344' });
		expect(result.body.jwt).not.toBeUndefined();
	});

	it('should login error', async () => {
		const result = await request(application.app)
			.post('/users/login')
			.send({ email: 'amanda@mail.com', password: '1' });
		expect(result.statusCode).toBe(401);
	});

	it('should get info success', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'amanda@mail.com', password: '11223344' });
		const result = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`);
		expect(result.body.email).toBe('amanda@mail.com');
		jwt = login.body.jwt;
	});

	it('should get info error', async () => {
		const result = await request(application.app)
			.get('/users/info')
			.set('Authorization', 'Bearer 1');
		expect(result.statusCode).toBe(401);
	});

	it('should register provider', async () => {
		const provider = { name: 'Dan', email: 'dan@mail.com', role: 'provider' };

		const result = await request(application.app)
			.post('/users/provider')
			.set('Authorization', `Bearer ${jwt}`)
			.send({ ...provider, password: '11223344' });
		expect(result.body.email).toBe(provider.email);

		const users = await request(application.app)
			.get('/users/all-users')
			.set('Authorization', `Bearer ${jwt}`);
		const userId = users.body.find((u: UserModel) => u.email === provider.email).id;
		providerId = userId;
	});

	it('should delete provider', async () => {
		const provider = { id: providerId, name: 'Dan', email: 'dan@mail.com', role: 'provider' };

		const result = await request(application.app)
			.delete('/users/provider')
			.set('Authorization', `Bearer ${jwt}`)
			.send({ id: providerId });
		expect(result.body).toBe(providerId);
	});
});
