import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import {Basket, UserModel} from '@prisma/client';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<void>;
	ValidateUser: (dto: UserLoginDto) => Promise<boolean>;
	getJWT: (email: string) => Promise<void>;
	getUserInfo: (email: string) => Promise<UserModel | null>;
	getBasketByUser: (userId: string) => Promise<Basket[] | null>;
}
