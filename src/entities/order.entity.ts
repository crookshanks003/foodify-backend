import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { DeliveryBoy } from "./delivery_boy.entity";
import { OrderItem } from "./order_item.entity";
import { OrderStatus } from "./order_status.entity";
import { Restaurant } from "./restaurant.entity";
import { User } from "./user.entity";

@Entity()
export class Order {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User)
	user: User;

	@OneToMany(() => OrderItem, (orderItem) => orderItem.order)
	orderItems: OrderItem[];

	@Column()
	price: number;

	@OneToOne(() => OrderStatus, (status) => status.order)
	status: OrderStatus;

	@ManyToOne(() => DeliveryBoy, (deliveryBoy) => deliveryBoy.orders, { nullable: true })
	deliveryBoy: DeliveryBoy;

	@ManyToOne(() => Restaurant, (restaurant) => restaurant.orders)
	restaurant: Restaurant;

	@CreateDateColumn()
	created_at: Date;
}
