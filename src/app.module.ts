import { Module } from "@nestjs/common";
import { Connection } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/";
import { AuthModule } from "./modules/auth/auth.module";
require("dotenv").config();

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			host: process.env.DB_HOST,
			port: 5432,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: [User],
			synchronize: true,
			ssl: {rejectUnauthorized:false},
		}),
		AuthModule,
	],
})
export class AppModule {
	constructor(private connection: Connection) {}
}
