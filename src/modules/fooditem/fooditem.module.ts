import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category, FoodItem } from "src/entities";
import { ServiceModule } from "src/services/service.module";
import { CategoryModule } from "../category/category.module";
import { FoodController } from "./fooditem.controller";
import { FoodService } from "./fooditem.service";

@Module({
	imports: [TypeOrmModule.forFeature([Category, FoodItem]), ServiceModule],
	controllers: [FoodController],
	providers: [FoodService],
})
export class FoodModule {}
