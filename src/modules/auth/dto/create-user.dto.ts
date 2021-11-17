import {IsString, IsNumberString, Length, IsBoolean} from "class-validator";

export class CreateUser {
	@IsString()
	name!:string;

	@IsNumberString()
	@Length(10, 10, {message:"Invalid phone number"})
	phone!:string;

	@IsString()
	@Length(6)
	password!:string;
}
