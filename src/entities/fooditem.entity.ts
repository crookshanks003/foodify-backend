import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { OrderItem } from "./order_item.entity";

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

	@Column({ default: 100 })
	calories: number;

	@ManyToOne(() => Category, (category) => category.items)
	category: Category;

	@OneToMany(() => OrderItem, orderItem => orderItem.foodItem)
	orderItem: OrderItem[]
}
