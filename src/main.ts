import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as helmet from "helmet";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	app.use(helmet());
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(process.env.PORT || 8080);
}
bootstrap();
