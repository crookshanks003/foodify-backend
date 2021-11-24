import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class DeliveryBoy {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	phone: string;

	@OneToMany(() => Order, (order) => order.deliveryBoy)
	orders: Order[];
}
