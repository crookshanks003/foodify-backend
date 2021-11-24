import { IsArray, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class OrderItemDto {
	itemId: number;
	quantity: number;
}

export class CreateOrderDto {
	@IsNumber()
	userId: number;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => OrderItemDto)
	orderItem: OrderItemDto[];

	@IsNumber()
	price: number;

	@IsNumber()
	calories: number;
}
