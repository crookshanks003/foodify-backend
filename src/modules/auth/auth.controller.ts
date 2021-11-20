import {
	BadRequestException,
	Body,
	Request,
	Controller,
	Get,
	Post,
} from "@nestjs/common";
import { CreateUser } from "./dto/create-user.dto";
import { LoginUser } from "./dto/login-user.dto";
import { AuthService } from "./auth.service";
import { Private } from "src/common/isPublic";

@Controller("user")
export class AuthController {
	constructor(private readonly userService: AuthService) {}

	@Post("signup")
	async userSignup(@Body() body: CreateUser) {
		const existingUser = await this.userService.getUserByPhone(body.phone);
		if (existingUser) {
			throw new BadRequestException([`Account with phone ${body.phone} already exists`]);
		}
		const user = await this.userService.createUser(body);
		const token = this.userService.getJwtToken(user);
		return { access_token: token };
	}

	@Post("login")
	async userLogin(@Body() body: LoginUser) {
		const user = await this.userService.getUser(body);
		const token = this.userService.getJwtToken(user);
		return { access_token: token };
	}

	@Private()
	@Get(["", "info"])
	async getUserInfo(@Request() req: any) {
		const { phone } = req.user;
		const { password, ...rest } = await this.userService.getUserByPhone(phone);
		return rest;
	}
}
