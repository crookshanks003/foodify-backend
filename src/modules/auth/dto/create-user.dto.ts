import { IsString, IsNumberString, Length } from "class-validator";

export class CreateUserDto {
	@IsString()
	name!: string;

	@IsNumberString()
	@Length(10, 10, { message: "Invalid phone number" })
	phone!: string;

	@IsString()
	@Length(6)
	password!: string;
}
