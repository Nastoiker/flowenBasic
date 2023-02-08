import { PrismaService } from '../database/prisma.service';
import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
import { BoughtProduct } from '@prisma/client';
@injectable()
export class CronRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
	async findMany(): Promise<BoughtProduct[] | null> {
		return this.prismaService.client.boughtProduct.findMany({
			where: {
				isFinal: false,
			},
		});
	}
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
		return this.prismaService.client.boughtProduct.create({
			data: {
				uuid,
				isFinal,
				userId,
				delivered: false,
				finnalyPrice: paymentAmount,
			},
		});
	}

	async update(uuid: string, paymentAmount: string, isFinal: boolean, url: string) {
		return this.prismaService.client.boughtProduct.update({
			where: { uuid },
			data: {
				uuid,
				finnalyPrice: paymentAmount,
				isFinal,
			},
		});
	}
}
