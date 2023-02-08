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
		paymentAmount: string,
		isFinal: boolean,
		userId: string,
	) {
		return this.cronRepository.createPayment(
			uuid,
			orderId,
			status,
			paymentAmount,
			isFinal,
			userId,
		);
	}
}
