import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/entities";
import { ServiceModule } from "src/services/service.module";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([Category]),
		ServiceModule
	],
	controllers: [CategoryController],
	providers: [CategoryService]
})
export class CategoryModule {}
