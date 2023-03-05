import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UserEditProfileDto {
	@IsString({ message: 'неверный password' })
	phone!: string;
	@IsString({ message: 'Неверный login' })
	login: string;
}
