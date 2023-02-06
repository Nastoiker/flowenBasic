import {createPayment, ICryptomusService} from './cryptomus.interface';
import { ConfigService } from '../config/config.service';
import { IConfigService } from '../config/config.service.interface';
import { injectable } from 'inversify';
import crypto from 'crypto';
import axios from 'axios';
@injectable()
export class CryptomusService implements ICryptomusService {
	private apiKey: string;
	private merchantId: string;
	constructor(private readonly configService: IConfigService) {
		this.apiKey = this.configService.get('CRYPTO_API_KEY');
		this.merchantId = this.configService.get('CRYPTO_MERCHANT_KEY');
	}
	async checkPayment(uuid: string): Promise<createPayment | undefined> {
		try {
			const payload = {
				uuid
			};
			const { data } = await axios.post(
				'https://api.cryptomus.com/v1/payment/info',
				payload,
				{
					headers: this.getHeader(JSON.stringify(payload)),
				},
			);
			return data;
		} catch (e) {
			console.error(e);
		}
	}

	async createPayment(amount: number, orderId: string): Promise<createPayment | undefined>{
		try {
			const payload = {
				amount: amount.toString(),
				currency: 'USD',
				order_od: orderId,
			};
			const { data } = await axios.post('https://api.cryptomus.com/v1/payment', payload, {
				headers: this.getHeader(JSON.stringify(payload)),
			});
			return data;
		} catch (e) {
			console.error(e);
		}
	}
	getHeader(payload: string): { sign: string; merchant: string } {
		const sign = crypto
			.createHash('md5')
			.update(Buffer.from(payload).toString('base64') + this.apiKey)
			.digest('hex');
		return {
			merchant: this.merchantId,
			sign,
		};
	}
}
