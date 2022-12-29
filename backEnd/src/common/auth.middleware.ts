import { IMiddleware } from './middlewares.interface';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface JwtPayload {
	email: string;
}
export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			try {
				const { email } = verify(
					req.headers.authorization.split(' ')[1],
					this.secret,
				) as JwtPayload;
				req.user = email.toString();
				next();
			} catch {
				next();
			}
		} else next();
	}
}
