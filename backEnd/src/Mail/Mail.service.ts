import { inject, injectable } from 'inversify';
import { createTransport, Transporter } from 'nodemailer';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { MailRepository } from './Mail.repository';
@injectable()
export class MailService {
	private transport: Transporter;
	constructor(
		@inject(TYPES.ConfigService) private readonly configService: IConfigService,
		@inject(TYPES.MailRepository) private readonly mailRepository: MailRepository,
	) {
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
	async sendActivateEmail(to: string, link: string): Promise<void> {
		const code = link.slice(0, 4);
		await this.transport.sendMail({
			from: this.configService.get('ADMIN_EMAILVERIFY'),
			to,
			subject: 'Активация акканта ' + to,
			text: '',
			html: `
				<div style="margin: 50px; font-color: black">
				<h1>Для активации введите код нижен на сайте регистрации</h1>
				<code style="border: 1px solid gray; padding: 10px; border-radius: 5px">${code}</code>
			</div>
			`,
		});
	}
	async sendForAll(file: Express.Multer.File): Promise<void | null> {
		const allUser = await this.mailRepository.getEmailAllUser();
		return await this.sendNews(allUser, 'Акция', file.buffer);
	}
	async sendNews(to: string[], message: string, html: Buffer): Promise<void | null> {
		try {
			await this.transport.sendMail({
				from: this.configService.get('ADMIN_EMAILVERIFY'),
				to,
				subject: 'Новость',
				text: '',
				html: html,
			});
		} catch {
			return null;
		}

	}
}
