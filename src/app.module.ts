import { Module } from "@nestjs/common";
import { Connection } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category, FoodItem, User } from "./entities/";
import { AuthModule } from "./modules/auth/auth.module";
import { CategoryModule } from "./modules/category/category.module";
require("dotenv").config();

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "mysql",
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			socketPath: process.env.DB_SOCKET,
			// host: process.env.DB_HOST,
			entities: [User, Category, FoodItem],
			synchronize: true,
		}),
		AuthModule,
		CategoryModule,
	],
})
export class AppModule {
	constructor(private connection: Connection) {}
}
