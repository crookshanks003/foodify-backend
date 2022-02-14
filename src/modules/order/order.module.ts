import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FoodItem, Order, OrderStatus, User, DeliveryBoy, OrderItem } from "src/entities";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([Order, FoodItem, OrderStatus, User, OrderItem, DeliveryBoy]),
	],
	controllers: [OrderController],
	providers: [OrderService],
})
export class OrderModule {}
