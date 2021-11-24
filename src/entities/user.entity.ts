import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	password: string;

	@Column()
	phone: string;

	@Column()
	is_staff: boolean;

	@Column({ default: 0 })
	calories: number;

	@Column({ nullable: true })
	address: string;

	@OneToMany(() => Order, (order) => order.user)
	orders: Order[];

	@CreateDateColumn()
	registered_on: Date;
}
