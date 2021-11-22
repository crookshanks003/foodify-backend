require("dotenv").config();

export = {
	type: "mysql",
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	socketPath: process.env.DB_SOCKET,
	// host: process.env.DB_HOST,
	entities: ["src/entities/*.ts"],
	migrations: ["src/migrations/*{.ts,.js}"],
	cli: {
		migrationsDir: "src/migrations"
	}
}
