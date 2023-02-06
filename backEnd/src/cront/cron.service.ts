import { ICronService } from './cront.service.interface';
import {inject, injectable} from 'inversify';
import { CronRepository } from './cron.repository';
import { TYPES } from '../types';
import {CryptomusService} from "../cryptomus/cryptomus.service";
import cron from 'node-cron';
@injectable()
export class CronService implements ICronService {
	constructor(@inject(TYPES.CronRepository) private cronRepository: CronRepository, @inject(TYPES.CryptomusService) private cryptomus: CryptomusService) {}
	init(): void {
		cron.schedule('*/5*****', async () => {
			const payments = await this.cronRepository.pr
		})
	}
}
