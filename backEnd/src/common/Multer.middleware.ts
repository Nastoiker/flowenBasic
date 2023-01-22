import { IMiddleware } from './middlewares.interface';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
export class MulterMiddleware implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		const storage = multer.diskStorage({
			destination: './uploads/',
			filename: (req, file, cb) => {
				cb(null, file.originalname);
				req.file = file;
			},
		});

		const upload = multer({ storage }).single('files');

		try {
			console.log('1' + req.file?.originalname);
			upload(req, res, (err) => {
				if (err) {
					throw new Error('1 error');
				} else {
					next();
				}
			});
		} catch {
			res.status(400).send({ error: 'asdasdasdasd' });
		}
	}
}
