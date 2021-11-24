import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { DeliveryBoy } from "./delivery_boy.entity";
import { OrderItem } from "./order_item.entity";
import { OrderStatus } from "./order_status.entity";
import { User } from "./user.entity";

@Entity()
export class Order {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, (user) => user.orders)
	user: User;

	@OneToMany(() => OrderItem, (orderItem) => orderItem.order)
	orderItems: OrderItem[];

	@Column()
	price: number;

	@Column()
	calories: number;

	@OneToOne(() => OrderStatus, (status) => status.order)
	status: OrderStatus;

	@OneToMany(() => DeliveryBoy, (deliveryBoy) => deliveryBoy.orders, { nullable: true })
	deliveryBoy: DeliveryBoy;

	@CreateDateColumn()
	created_at: Date;
}
