import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FoodItem } from "./fooditem.entity";
import { Order } from "./order.entity";

@Entity()
export class OrderItem {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	quantity: number;

	@ManyToOne(() => Order, (order) => order.orderItems)
	order: Order;

	@ManyToOne(() => FoodItem, foodItem => foodItem.orderItem)
	foodItem: FoodItem;
}
