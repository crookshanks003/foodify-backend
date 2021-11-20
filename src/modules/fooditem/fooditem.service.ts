import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FoodItem } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class FoodService {
	constructor(
		@InjectRepository(FoodItem)
		private readonly foodRepo: Repository<FoodItem>
	){}
}
