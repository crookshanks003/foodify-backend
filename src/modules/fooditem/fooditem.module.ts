import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FoodItem } from "src/entities";
import { ServiceModule } from "src/services/service.module";
import { FoodController } from "./fooditem.controller";
import { FoodService } from "./fooditem.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([FoodItem]),
		ServiceModule
	],
	controllers: [FoodController],
	providers: [FoodService]
})
export class CategoryModule {}
