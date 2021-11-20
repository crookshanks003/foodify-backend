import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "src/services";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { Private } from "src/common/isPublic";

@Controller("category")
export class CategoryController {
	constructor(
		private readonly categoryService: CategoryService,
		private readonly fileService: FileService,
	) {}

	@Get("all")
	async getAll() {
		return await this.categoryService.getAllCategories();
	}

	@Get(":id")
	async getOne(@Param("id") id: number) {
		if (typeof id !== "string") {
			throw new BadRequestException(["id must be a number"]);
		}
		return await this.categoryService.getCategoryById(id);
	}

	@Private()
	@Post("")
	@UseInterceptors(FileInterceptor("image", { limits: { fileSize: 10 * 1024 * 1024 } }))
	async addCategory(
		@UploadedFile() image: Express.Multer.File,
		@Body() { name, description }: CreateCategoryDto,
	) {
		const url = await this.fileService.uploadFile(image);
		return await this.categoryService.addCategory(name, description, url);
	}

	@Private()
	@Delete(":id")
	async deleteCategory(@Param("id") id: number) {
		if (typeof id !== "string") {
			throw new BadRequestException(["id must be a number"]);
		}
		return await this.categoryService.deleteCategoryById(id);
	}
}
