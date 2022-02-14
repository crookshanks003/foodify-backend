import { IsArray, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class OrderItemDto {
	itemId: number;
	quantity: number;
}

export class CreateOrderDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => OrderItemDto)
	orderItem: OrderItemDto[];

	@IsNumber()
	price: number;
}
