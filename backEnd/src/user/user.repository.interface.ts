import { Basket, UserModel, Comment, Address } from '@prisma/client';
import { User } from './user.entity';
import { UserAdressDto } from './dto/user-adress.dto';
import {UserEditProfileDto} from "./dto/user-editProfile.dto";
import {VerfiyRegisterDto} from "./dto/user-register.dto";
export interface IUserRepository {
	find: (email: string) => Promise<UserModel | null>;
	createUser: (user: User) => Promise<UserModel | null>;
	findProfile: (login: string) => Promise<UserModel | null>;
	getBasketByUser: (userId: string) => Promise<Basket[] | null>;
	updateAvatar: (avatar: string, id: string) => Promise<UserModel>;
	checkActiveUser: (id: string) => Promise<UserModel | null>;
	verifyEmail: (verifyUser: VerfiyRegisterDto) => Promise<UserModel | null>;
	deleteComment: (commentId: string) => Promise<Comment | null>;
	getProfileInfoById: (id: string) => Promise<UserModel | null>;
	editAddress: (address: UserAdressDto) => Promise<Address | null>;
	createAddress: (address: UserAdressDto) => Promise<Address | null>;
	editProfileInfo: (info: UserEditProfileDto, id: string) => Promise<UserModel | null>;
}
