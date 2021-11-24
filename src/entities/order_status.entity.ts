import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderStatus {
	@PrimaryGeneratedColumn()
	id: number;

	//0 -> confirmed, 1 -> prepared, 2 -> delivered
	@Column({ default: 0 })
	status: 0 | 1 | 2;

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