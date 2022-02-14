import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order.entity";

export enum OrderStatusEnum {
	CONFIRMED = 0,
	DISPATCHED = 1,
	DELIVERED = 2,
	CANCELED = 3,
}

@Entity()
export class OrderStatus {
	@PrimaryGeneratedColumn()
	id: number;

	//0 -> confirmed, 1 -> dispatched, 2 -> delivered, 3 -> canceled
	@Column({ default: 0 })
	status: OrderStatusEnum;

	@CreateDateColumn()
	order_time: Date;

	@Column({ nullable: true })
	delivered_time: Date;

	@Column({ nullable: true })
	dispatch_time: Date;

	@OneToOne(() => Order, (order) => order.status)
	@JoinColumn()
	order: Order;
}
