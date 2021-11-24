import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateFoodDto {
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	description: string;

	@IsNumberString()
	price: string;

	@IsOptional()
	@IsNumberString()
	calories: string;

	@IsNumberString()
	categoryId: string;
}
