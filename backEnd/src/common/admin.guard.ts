import { IMiddleware } from './middlewares.interface';
import { NextFunction, Request, Response } from 'express';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { inject } from 'inversify';

export class AdminGuard implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		const adminEmail = 'damur2004@gmail.com';
		if (req.user == adminEmail) {
			return next();
		}
		res.status(401).send({ error: 'вы не зашли под админа' });
	}
}
