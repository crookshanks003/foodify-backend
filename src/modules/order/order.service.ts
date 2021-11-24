import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FoodItem, Order, OrderStatus, User, OrderItem } from "src/entities";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";

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

	async getOrderById(id: number) {
		return this.orderRepo.findOne({ id });
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
}
