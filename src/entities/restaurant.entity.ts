import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FoodItem, Order } from ".";

@Entity()
export class Restaurant {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	location: string;

	@Column()
	phone: string;

	@Column()
	password: string;

	@OneToMany(() => FoodItem, (foodItem) => foodItem.restaurant)
	foodItems: FoodItem[];

	@OneToMany(() => Order, (order) => order.restaurant)
	orders: Order[];
}
