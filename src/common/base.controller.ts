import { Response, Router } from 'express';
import { ILogger } from '../logger/logger.interface';
import { IControllerRoute } from './route.interface';

export class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router() {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): Response {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T) {
		return this.send<T>(res, 200, message);
	}

	public created(res: Response) {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		routes.forEach((route) => {
			this.logger.log(`[${route.method}] - ${route.path}`);
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		});
	}
}
