import { BadRequestException, Body, Request, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateUser } from "./dto/create-user.dto";
import { LoginUser } from "./dto/login-user.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt.guard";
import { Public } from "src/common/isPublic";

@Controller("user")
export class AuthController {
	constructor(private readonly userService: AuthService) {}

	@Public()
	@Post("signup")
	async userSignup(@Body() body: CreateUser) {
		const existingUser = await this.userService.getUserByPhone(body.phone);
		if (existingUser) {
			throw new BadRequestException([`Account with phone ${body.phone} lready exists`]);
		}
		const user = await this.userService.createUser(body);
		const token = this.userService.getJwtToken(user);
		return {access_token: token};
	}

	@Public()
	@Post("login")
	async userLogin(@Body() body: LoginUser) {
		const user = await this.userService.getUser(body);
		const token = this.userService.getJwtToken(user);
		return {access_token: token};
	}

	@UseGuards(JwtAuthGuard)
	@Get(["", "info"])
	async getUserInfo(@Request() req:any){
		const {phone} = req.user;
		const {password, ...rest} = await this.userService.getUserByPhone(phone)	
		return rest;
	}
}
