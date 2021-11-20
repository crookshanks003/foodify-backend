import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class FoodItem {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({nullable: true})
	description: String;

	@Column()
	image: String;

	@ManyToOne(() => Category, (category) => category.items)
	category: Category;
}
