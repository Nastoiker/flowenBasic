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
		isFinal: boolean,
		userId: string,
	) {
		return this.prismaService.client.boughtProduct.create({
			data: {
				uuid,
				isFinal,
				userId,
				delivered: false,
				finnalyPrice: amount,
			},
		});
	}

	async update(uuid: string, paymentAmount: string, isFinal: boolean) {
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
