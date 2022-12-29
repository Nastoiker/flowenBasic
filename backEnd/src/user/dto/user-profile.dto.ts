import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'неверный login' })
	login: string;
	comment: Comment[];
}
export class Comment {
	@IsString()
	comment: string;
	@IsNumber()
	writtenById: number;
	@IsNumber()
	productId: number;
}
