import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../entities/";
import { CreateUserDto } from "./dto/create-user.dto";
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

	async createUser(user: CreateUserDto) {
		const newUser = new User();
		newUser.name = user.name;
		newUser.phone = user.phone;
		newUser.password = await bcrypt.hash(user.password, this.saltRounds);
		return this.userRepo.save(newUser);
	}

	async getUser(credentials: LoginUser) {
		const existingUser = await this.getUserByPhone(credentials.phone);
		if (!existingUser) {
			throw new BadRequestException(["Account does not exist"]);
		}
		await this.verifyPassword(credentials.password, existingUser.password);
		return existingUser;
	}

	getJwtToken(isRestaurant: boolean, id: number) {
		const payload = { user: { isRestaurant, userId: id } };
		return this.jwtService.sign(payload);
	}

	getUserByPhone(phone: string) {
		return this.userRepo.findOne({ phone });
	}

	getUserById(id: number) {
		return this.userRepo.findOne({ id });
	}

	private async verifyPassword(password: string, hash: string) {
		const match = await bcrypt.compare(password, hash);
		if (!match) {
			throw new BadRequestException(["Password is incorrect"]);
		}
	}
}
