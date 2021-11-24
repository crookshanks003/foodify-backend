import { IsNumber } from "class-validator";

export class UpdateStatusDto {
	@IsNumber()
	status: 0 | 1 | 2;

	@IsNumber()
	orderId: number;
}
