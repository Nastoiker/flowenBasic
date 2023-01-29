import { Basket, UserModel } from '@prisma/client';
import { User } from './user.entity';
export interface IUserRepository {
	find: (email: string) => Promise<UserModel | null>;
	createUser: (user: User) => Promise<UserModel>;
	findProfile: (login: string) => Promise<UserModel | null>;
	getBasketByUser: (userId: string) => Promise<Basket[] | null>;
}
