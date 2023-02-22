import { Basket, UserModel } from '@prisma/client';
import { User } from './user.entity';
export interface IUserRepository {
	find: (email: string) => Promise<UserModel | null>;
	createUser: (user: User) => Promise<UserModel>;
	findProfile: (login: string) => Promise<UserModel | null>;
	getBasketByUser: (userId: string) => Promise<Basket[] | null>;
	updateAvatar: (avatar: string, id: string) => Promise<UserModel>;
	checkActiveUser: (id: string) => Promise<UserModel | null>;
	verifyEmail: (id: string) => Promise<UserModel | null>;
	deleteComment: (modelDeviceId: string, writtenById: string) => Promise<Comment | null>;
}
