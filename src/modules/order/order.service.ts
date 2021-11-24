import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { sampleTime } from "rxjs";
import { FoodItem, Order, OrderStatus, User, OrderItem } from "src/entities";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";

@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(Order)
		private readonly orderRepo: Repository<Order>,
		@InjectRepository(User)
		private readonly userRepo: Repository<User>,
		@InjectRepository(FoodItem)
		private readonly foodRepo: Repository<FoodItem>,
		@InjectRepository(OrderStatus)
		private readonly orderStatusRepo: Repository<OrderStatus>,
		@InjectRepository(OrderItem)
		private readonly orderItemRepo: Repository<OrderItem>,
	) {}

	async getOrderById(id: number, userId: number) {
		await this.checkOrderOwnership(userId, id);
		return this.orderRepo
			.createQueryBuilder("order")
			.innerJoinAndSelect("order.orderItems", "orderItems")
			.innerJoinAndSelect("orderItems.foodItem", "foodItem")
			.innerJoinAndSelect("order.status", "status")
			.where("order.id = :id", { id })
			.getOne();
	}

	async getUserById(id: number) {
		return await this.userRepo.findOne({ id });
	}

	async getFoodItemById(id: number) {
		return await this.foodRepo.findOneOrFail({ id });
	}

	async getFoodByIds(ids: number[]) {
		return await this.foodRepo.findByIds(ids);
	}

	async newOrderItem(items: OrderItem[]) {
		return await this.orderItemRepo.save(items);
	}

	async getOrderStatus(id: number) {
		return await this.orderStatusRepo.findOne({ order: { id } });
	}

	async checkOrderOwnership(userId: number, orderId: number) {
		const order = await this.orderRepo
			.createQueryBuilder("order")
			.innerJoin("order.user", "user")
			.addSelect(["user.id"])
			.where("order.id = :id", { id: orderId })
			.getOne();
		if (order.user.id !== userId) {
			throw new BadRequestException([`This order does not belong to user ${userId}`]);
		}
		return;
	}

	async addOrder(order: CreateOrderDto, user: User, orderItems: OrderItem[]) {
		const newOrder = new Order();
		newOrder.user = user;
		newOrder.calories = order.calories;
		newOrder.price = order.price;
		newOrder.orderItems = orderItems;
		const savedOrder = await this.orderRepo.save(newOrder);

		const orderStatus = new OrderStatus();
		orderStatus.order = newOrder;
		orderStatus.status = 0;
		await this.orderStatusRepo.save(orderStatus);

		return savedOrder;
	}

	async updateOrderStatus(status: UpdateStatusDto) {
		const order = await this.orderRepo.findOne({ id: status.orderId });
		if (!order) {
			throw new BadRequestException([`Order with id ${status.orderId} does not exist`]);
		}
		const newStatus = await this.orderStatusRepo
			.createQueryBuilder("order_status")
			.innerJoin("order_status.order", "order")
			.where("order.id = :id", { id: status.orderId })
			.getOne();
		newStatus.status = status.status;
		switch (status.status) {
			case 0:
				newStatus.order_time = new Date();
				break;
			case 1:
				newStatus.dispatch_time = new Date();
				break;
			case 2:
				newStatus.delivered_time = new Date();
				break;
		}
		return this.orderStatusRepo.save(newStatus);
	}

	async cancelOrder(orderId:number){
		const order = await this.orderRepo.findOne({ id: orderId });
		if (!order) {
			throw new BadRequestException([`Order with id ${orderId} does not exist`]);
		}
		const orderStatus = await this.orderStatusRepo.findOne({order: {id:orderId}});
		orderStatus.status = 3;
		return await this.orderStatusRepo.save(orderStatus);
	}
}
