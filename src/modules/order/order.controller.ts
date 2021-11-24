import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Request } from "@nestjs/common";
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
	async getById(@Param("id") id: number, @Request() req:any) {
		const {userId} = req.user;
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
		const order = await this.orderService.addOrder(body, user, savedOrderItems);
		return order;
	}

	@Private()
	@Get(":id/status")
	async getOrderStatus(@Param("id") orderId: number, @Request() req:any) {
		const {userId} = req.user;
		await this.orderService.checkOrderOwnership(userId, orderId)
		return this.orderService.getOrderStatus(orderId);
	}

	@Patch(":id")
	async updateOrderStatus(@Body() body:UpdateStatusDto) {
		return await this.orderService.updateOrderStatus(body);
	}

	@Delete(":id")
		async cancelOrder(@Param("id") id:number){
			return await this.orderService.cancelOrder(id);
	}
}
