import { IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateFoodDto {
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	description: string;

	@IsNumberString()
	price: string;

	@IsNumberString()
	categoryId: string;
}
