import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

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

	@CreateDateColumn()
	registered_on: Date;
}
