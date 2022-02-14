import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { sampleTime } from "rxjs";
import { FoodItem, Order, OrderStatus, User, OrderItem, OrderStatusEnum } from "src/entities";
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

	getUserById(id: number) {
		return this.userRepo.findOne({ id });
	}

	getFoodItemById(id: number) {
		return this.foodRepo.findOneOrFail({ id });
	}

	getFoodByIds(ids: number[]) {
		return this.foodRepo.findByIds(ids);
	}

	newOrderItem(items: OrderItem[]) {
		return this.orderItemRepo.save(items);
	}

	async getOrderStatus(id: number, userId: number) {
		await this.checkOrderOwnership(userId, id);
		return this.orderStatusRepo.findOne({ order: { id } });
	}

	private async checkOrderOwnership(userId: number, orderId: number) {
		const order = await this.orderRepo
			.createQueryBuilder("order")
			.innerJoin("order.user", "user")
			.addSelect(["user.id"])
			.where("order.id = :id", { id: orderId })
			.getOne();
		if (order.user.id !== userId) {
			throw new BadRequestException([`This order does not belong to user ${userId}`]);
		}
		return true;
	}

	async addOrder(order: CreateOrderDto, user: User, orderItems: OrderItem[]) {
		const newOrder = new Order();
		newOrder.user = user;
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
			case OrderStatusEnum.CONFIRMED:
				newStatus.order_time = new Date();
				break;
			case OrderStatusEnum.DISPATCHED:
				newStatus.dispatch_time = new Date();
				break;
			case OrderStatusEnum.DELIVERED:
				newStatus.delivered_time = new Date();
				break;
		}
		return this.orderStatusRepo.save(newStatus);
	}

	async cancelOrder(orderId: number) {
		const order = await this.orderRepo.findOne({ id: orderId });
		if (!order) {
			throw new BadRequestException([`Order with id ${orderId} does not exist`]);
		}
		const orderStatus = await this.orderStatusRepo.findOne({ order: { id: orderId } });
		orderStatus.status = OrderStatusEnum.CANCELED;
		return await this.orderStatusRepo.save(orderStatus);
	}
}
