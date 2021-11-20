import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PRIVATE_KEY } from "src/common/isPublic";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
	constructor(private reflector: Reflector) {
		super();
	}

	//exclude routes with @Public
	canActivate(context: ExecutionContext) {
		const isPrivate = this.reflector.getAllAndOverride<boolean>(IS_PRIVATE_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPrivate) {
			return super.canActivate(context);
		}
		return true;
	}
}
