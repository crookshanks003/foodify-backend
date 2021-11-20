import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
require("dotenv").config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromHeader("accesstoken"),
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: any) {
		return payload.user;
	}
}
