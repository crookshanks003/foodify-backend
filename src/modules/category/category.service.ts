import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category)
		private readonly categoryRepo: Repository<Category>,
	) {}

	async getAllCategories() {
		const categories = await this.categoryRepo.createQueryBuilder("category").getMany();
		return categories;
	}

	async getCategoryById(id: number) {
		const category = await this.categoryRepo
			.createQueryBuilder("category")
			.innerJoinAndSelect("category.items", "food_item")
			.where("category.id = :id", {id})
			.getOne();
		return category;
	}

	async addCategory(name: string, description: string, image: string) {
		const newCategory = new Category();
		newCategory.description = description;
		newCategory.name = name;
		newCategory.image = image;
		return await this.categoryRepo.save(newCategory);
	}

	async deleteCategoryById(id: number) {
		return await this.categoryRepo.delete(id);
	}
}
