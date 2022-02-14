import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { OrderItem } from "./order_item.entity";
import { Restaurant } from "./restaurant.entity";

@Entity()
export class FoodItem {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	@Column()
	image: string;

	@Column()
	price: number;

	@ManyToOne(() => Category, (category) => category.items)
	category: Category;

	@OneToMany(() => OrderItem, (orderItem) => orderItem.foodItem)
	orderItem: OrderItem[];

	@ManyToOne(() => Restaurant, (restaurant) => restaurant.foodItems)
	restaurant: Restaurant;
}
