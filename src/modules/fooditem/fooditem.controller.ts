import { Controller } from "@nestjs/common";
import { FoodService } from "./fooditem.service";

@Controller()
export class FoodController {
	constructor(private readonly foodService : FoodService){}
}
