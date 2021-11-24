import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category, FoodItem } from "src/entities";
import { Repository } from "typeorm";
import { CreateFoodDto } from "./dto/create-food.dto";

@Injectable()
export class FoodService {
	constructor(
		@InjectRepository(FoodItem)
		private readonly foodRepo: Repository<FoodItem>,
		@InjectRepository(Category)
		private readonly categoryRepo: Repository<Category>,
	) {}

	async getAllFoodItems() {
		return await this.foodRepo.createQueryBuilder("food_item").getMany();
	}

	async getFoodItemById(id: number) {
		return await this.foodRepo.findOne({ id });
	}

	async deleteFood(id: number) {
		return await this.foodRepo.delete(id);
	}

	async addFood(food: CreateFoodDto, image: string) {
		const category = await this.categoryRepo.findOne({ id: parseInt(food.categoryId) });
		if (!category) {
			throw new BadRequestException(["Category does not exist"]);
		}
		const newFood = new FoodItem();
		newFood.description = food.description;
		newFood.name = food.name;
		newFood.price = parseInt(food.price);
		newFood.calories = parseInt(food.calories);
		newFood.image = image;
		newFood.category = category;
		return await this.foodRepo.save(newFood);
	}
}
