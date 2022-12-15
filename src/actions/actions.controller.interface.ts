import { NextFunction, Request, Response } from 'express';

export interface IActionsController {
	getActions: (req: Request, res: Response, next: NextFunction) => void;
	addAction: (req: Request, res: Response, next: NextFunction) => Promise<void | null>;
	deleteAction: (req: Request, res: Response, next: NextFunction) => void;
	updateAction: (req: Request, res: Response, next: NextFunction) => void;
}
