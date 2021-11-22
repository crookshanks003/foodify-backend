import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../entities/";
import { CreateUser } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { LoginUser } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	private saltRounds = 10;

	constructor(
		@InjectRepository(User)
		private readonly userRepo: Repository<User>,
		private readonly jwtService: JwtService,
	) {}

	async createUser(user: CreateUser) {
		const newUser = new User();
		newUser.is_staff = false;
		newUser.name = user.name;
		newUser.phone = user.phone;
		newUser.calories = 0;
		newUser.password = await bcrypt.hash(user.password, this.saltRounds);
		return await this.userRepo.save(newUser);
	}

	async getUser(credentials: LoginUser) {
		const existingUser = await this.getUserByPhone(credentials.phone);
		if (!existingUser) {
			throw new BadRequestException(["Account does not exist"]);
		}
		await this.verifyPassword(credentials.password, existingUser.password);
		return existingUser;
	}

	getJwtToken({ is_staff, id }: User) {
		const payload = { user: { isStaff: is_staff, userId: id } };
		return this.jwtService.sign(payload);
	}

	async getUserByPhone(phone: string) {
		return await this.userRepo.findOne({ phone });
	}

	private async verifyPassword(password: string, hash: string) {
		const match = await bcrypt.compare(password, hash);
		if (!match) {
			throw new BadRequestException(["Password is incorrect"]);
		}
	}
}
