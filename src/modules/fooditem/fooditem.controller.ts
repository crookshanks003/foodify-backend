import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Private } from "src/common/isPublic";
import { FileService } from "src/services";
import { CreateFoodDto } from "./dto/create-food.dto";
import { FoodService } from "./fooditem.service";

@Controller("item")
export class FoodController {
	constructor(private readonly foodService: FoodService,
				private readonly fileService: FileService
			   ) {}

	@Get("all")
	async getAll() {
		return await this.foodService.getAllFoodItems();
	}

	@Get(":id")
	async getById(@Param("id") id: number) {
		return await this.foodService.getFoodItemById(id);
	}

	@Private()
	@Post("")
	@UseInterceptors(FileInterceptor("image", { limits: { fileSize: 10 * 1024 * 1024 } }))
	async addCategory(
		@UploadedFile() image: Express.Multer.File,
		@Body() body: CreateFoodDto,
	) {
		const url = await this.fileService.uploadFile(image);
		return await this.foodService.addFood(body, url);
	}

	@Private()
	@Delete(":id")
	async deleteFood(@Param("id") id: number){
		return this.foodService.deleteFood(id)
	}
}
