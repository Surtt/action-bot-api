import { NextFunction, Request, Response } from 'express';

export interface IActionsController {
	getActions: (req: Request, res: Response, next: NextFunction) => Promise<void | null>;
	addAction: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	deleteAction: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	updateAction: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	reviewAction: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
