import { IMiddleware } from './middlewares.interface';
import { injectable, inject } from 'inversify';
import { createTransport, Transport } from 'nodemailer';
import { NextFunction } from 'express';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
// @injectable()
// export class emailVerfify implements IMiddleware {
// 	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}
// 	execute(req: Request, res: Response, next: NextFunction): void {
// 		const mailOptions = {
// 			from: 'youremail@gmail.com',
// 			to: 'user@example.com',
// 			subject: 'Email Verification',
// 			text:
// 				'Click on the following link to verify your email: http://your-app.com/verify/' +
// 				token,
// 		};
// 		const transporter = createTransport({
// 			service: 'gmail',
// 			auth: {
// 				user: this.configService.get('ADMIN_EMAIL'),
// 				pass: this.configService.get('ADMIN_PASSWORD]'),
// 			},
// 		});
// 		transporter.sendMail(mailOptions, function (error, info) {
// 			if (error) {
// 				console.log(error);
// 			} else {
// 				console.log('Email sent: ' + info.response);
// 			}
// 		});
// 	}
// }
