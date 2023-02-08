import { CronRepository } from '../cront/cron.repository';
import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
@injectable()
export class BuyingService {
	constructor(@inject(TYPES.CronRepository) private readonly cronRepository: CronRepository) {}
	async createPayment(
		uuid: string,
		orderId: string,
		status: string,
		amount: string,
		paymentAmount: string,
		isFinal: boolean,
		url: string,
		userId: string,
	) {
		return this.cronRepository.createPayment(
			uuid,
			orderId,
			status,
			amount,
			paymentAmount,
			isFinal,
			url,
			userId,
		);
	}
}
