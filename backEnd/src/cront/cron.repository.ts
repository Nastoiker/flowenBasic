import { PrismaService } from '../database/prisma.service';
import { TYPES } from '../types';
import {inject, injectable} from 'inversify';
@injectable()
export class CronRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
}
