export interface Currency {
	currency: string;
	network: string;
}

export interface Result {
	uuid: string;
	order_id: string;
	amount: string;
	payment_amount: string;
	payer_amount: string;
	payer_currency: string;
	currency: string;
	network: string;

	payment_status: string;
	url: string;
	expired_at: number;
	status: string;
	is_final: boolean;
	additional_data?: any;
	currencies: Currency[];
}

export interface createPayment {
	state: number;
	result: Result;
}
export interface ICryptomusService {
	createPayment(amount: number, orderId: string): Promise<createPayment | undefined>;
	checkPayment(uuid: string): Promise<createPayment | undefined>;
	getHeader(payload: string): { sign: string; merchant: string };
}
