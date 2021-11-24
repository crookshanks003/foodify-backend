import { BadRequestException, Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrderItem } from "src/entities/order_item.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderService } from "./order.service";

@Controller("order")
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Get(":id")
	async getById(@Param("id") id: number) {
		return await this.orderService.getOrderById(id);
	}

	@Post("")
	async newOrder(@Body() body: CreateOrderDto) {
		const user = await this.orderService.getUserById(body.userId);
		if (!user) {
			throw new BadRequestException([`User with id ${body.userId} does not exist`]);
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
		console.log(orderItems);
		const savedOrderItems = await this.orderService.newOrderItem(orderItems);
		const order = await this.orderService.addOrder(body, user, savedOrderItems);
		return order;
	}
}
