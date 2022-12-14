import { NextFunction, Request, Response } from 'express';

export interface IUserController {
	login: (req: Request, res: Response, next: NextFunction) => void;
	register: (req: Request, res: Response, next: NextFunction) => void;
	deleteUser: (req: Request, res: Response, next: NextFunction) => void;
	updateUser: (req: Request, res: Response, next: NextFunction) => void;
	info: (req: Request, res: Response, next: NextFunction) => void;
}
