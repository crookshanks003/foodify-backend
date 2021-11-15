import { IsString, Length } from "class-validator";

export class LoginUser {
	@IsString()
	@Length(10, 10, { message: "Invalid phone number" })
	phone!: string;

	@IsString()
	password!: string;
}
