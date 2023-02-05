import { inject, injectable } from 'inversify';
import { createTransport, Transporter } from 'nodemailer';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
@injectable()
export class MailService {
	private transport: Transporter;
	constructor(@inject(TYPES.ConfigService) private readonly configService: IConfigService) {
		this.transport = createTransport({
			host: this.configService.get('HOST_SMTP'),
			port: Number(this.configService.get('SMTP_PORT')),
			secure: false,
			service: this.configService.get('EMAIL_SERVICE'),
			auth: {
				user: this.configService.get('ADMIN_EMAILVERIFY'),
				pass: this.configService.get('ADMIN_EMAIL_PASSWORD'),
			},
		});
	}
	async sendActivateEmail(to: string, link: string) {
		const verifyLink = this.configService.get('URL_API') + `/users/verify:${link}`;
		await this.transport.sendMail({
			from: this.configService.get('ADMIN_EMAILVERIFY'),
			to,
			subject: 'Активация акканта ' + verifyLink,
			text: '',
			html: `
				<div>
				<h1>Для активации перейдите по ссылке</h1>
				<a href="${verifyLink}">${verifyLink}</a>
			</div>
			`,
		});
	}
}
