import { IsNumber } from "class-validator";
import { OrderStatusEnum } from "src/entities";

export class UpdateStatusDto {
	@IsNumber()
	status: OrderStatusEnum;

	@IsNumber()
	orderId: number;
}
