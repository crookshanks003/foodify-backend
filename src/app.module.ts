import { Module } from "@nestjs/common";
import { Connection } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category, FoodItem, Order, OrderStatus, User } from "./entities/";
import { AuthModule } from "./modules/auth/auth.module";
import { CategoryModule } from "./modules/category/category.module";
import { FoodModule } from "./modules/fooditem/fooditem.module";
import { OrderModule } from "./modules/order/order.module";
import { DeliveryBoy } from "./entities/delivery_boy.entity";
import { OrderItem } from "./entities/order_item.entity";
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
			entities: [User, Category, FoodItem, Order, OrderStatus, DeliveryBoy, OrderItem],
			migrations: ["dist/src/migrations/*.ts"],
			cli: {
				migrationsDir: "src/migrations",
			},
		}),
		AuthModule,
		CategoryModule,
		FoodModule,
		OrderModule,
	],
})
export class AppModule {
	constructor(private connection: Connection) {}
}
