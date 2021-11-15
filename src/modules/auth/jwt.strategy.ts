import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
require("dotenv").config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromHeader("access_token"),
			secretOrKey: "j@1d#p6g",
		});
	}

	async validate(payload: any) {
		return payload.user;
	}
}
