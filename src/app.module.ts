import { Module } from "@nestjs/common";
import { Connection } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category, FoodItem, User } from "./entities/";
import { AuthModule } from "./modules/auth/auth.module";
import { CategoryModule } from "./modules/category/category.module";
import { FoodModule } from "./modules/fooditem/fooditem.module";
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
			migrations: ["src/migrations/*{.ts,.js}"],
			cli: {
				migrationsDir: "src/migrations"
			}
		}),
		AuthModule,
		CategoryModule,
		FoodModule,
	],
})
export class AppModule {
	constructor(private connection: Connection) {}
}
