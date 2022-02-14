import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Request,
} from "@nestjs/common";
import { Private } from "src/common/isPublic";
import { OrderItem } from "src/entities/order_item.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { OrderService } from "./order.service";

@Controller("order")
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Private()
	@Get(":id")
	async getById(@Param("id") id: number, @Request() req: any) {
		const { userId } = req.user;
		return await this.orderService.getOrderById(id, userId);
	}

	@Private()
	@Post("")
	async newOrder(@Body() body: CreateOrderDto, @Request() req: any) {
		const { userId } = req.user;
		const user = await this.orderService.getUserById(userId);
		if (!user) {
			throw new BadRequestException([`User with id ${userId} does not exist`]);
		}
		const itemIds = body.orderItem.map((item) => item.itemId);
		const foodItems = await this.orderService.getFoodByIds(itemIds);
		if (foodItems.length !== body.orderItem.length) {
			throw new BadRequestException(["Invalid item id"]);
		}
		const orderItems = body.orderItem.map((item) => {
			const newOrderItem = new OrderItem();
			const food = foodItems.find((el) => el.id === item.itemId);
			newOrderItem.quantity = item.quantity;
			newOrderItem.foodItem = food;
			return newOrderItem;
		});
		const savedOrderItems = await this.orderService.newOrderItem(orderItems);
		return this.orderService.addOrder(body, user, savedOrderItems);
	}

	@Private()
	@Get(":id/status")
	getOrderStatus(@Param("id") orderId: number, @Request() req: any) {
		const { userId } = req.user;
		return this.orderService.getOrderStatus(orderId, userId);
	}

	@Patch(":id/status")
	updateOrderStatus(@Body() body: UpdateStatusDto) {
		return this.orderService.updateOrderStatus(body);
	}

	@Delete(":id")
	cancelOrder(@Param("id") id: number) {
		return this.orderService.cancelOrder(id);
	}
}
