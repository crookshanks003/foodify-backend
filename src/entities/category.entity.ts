import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FoodItem } from "./fooditem.entity";

@Entity()
export class Category {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	@Column()
	image: string;

	@OneToMany((type) => FoodItem, (item) => item.category)
	items: FoodItem[];
}
