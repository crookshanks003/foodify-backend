import { Module } from "@nestjs/common";
import { Connection } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/"
import { AuthModule } from './modules/auth/auth.module';
require("dotenv").config();

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: [User],
			synchronize: true,
		}),
		AuthModule,
	],
})
export class AppModule {
	constructor(private connection: Connection) {}
}
