import { MigrationInterface, QueryRunner } from "typeorm";

export class orderMigration1637617714558 implements MigrationInterface {
	name = "orderMigration1637617714558";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE \`order_status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` int NOT NULL DEFAULT '0', \`order_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`delivered_time\` datetime NOT NULL, \`dispatch_time\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`is_staff\` tinyint NOT NULL, \`calories\` int NOT NULL DEFAULT '0', \`registered_on\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`price\` int NOT NULL, \`calories\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`food_item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`image\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`calories\` int NOT NULL DEFAULT '100', \`categoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`image\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`order_food_food_item\` (\`orderId\` int NOT NULL, \`foodItemId\` int NOT NULL, INDEX \`IDX_987ca0eb42f2c92302a38e45b2\` (\`orderId\`), INDEX \`IDX_b6bc6da1c6959cdb85a6df123e\` (\`foodItemId\`), PRIMARY KEY (\`orderId\`, \`foodItemId\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`food_item\` ADD CONSTRAINT \`FK_b8308793196731745525d419e41\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`order_food_food_item\` ADD CONSTRAINT \`FK_987ca0eb42f2c92302a38e45b28\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
		);
		await queryRunner.query(
			`ALTER TABLE \`order_food_food_item\` ADD CONSTRAINT \`FK_b6bc6da1c6959cdb85a6df123e4\` FOREIGN KEY (\`foodItemId\`) REFERENCES \`food_item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`order_food_food_item\` DROP FOREIGN KEY \`FK_b6bc6da1c6959cdb85a6df123e4\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`order_food_food_item\` DROP FOREIGN KEY \`FK_987ca0eb42f2c92302a38e45b28\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`food_item\` DROP FOREIGN KEY \`FK_b8308793196731745525d419e41\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``,
		);
		await queryRunner.query(
			`DROP INDEX \`IDX_b6bc6da1c6959cdb85a6df123e\` ON \`order_food_food_item\``,
		);
		await queryRunner.query(
			`DROP INDEX \`IDX_987ca0eb42f2c92302a38e45b2\` ON \`order_food_food_item\``,
		);
		await queryRunner.query(`DROP TABLE \`order_food_food_item\``);
		await queryRunner.query(`DROP TABLE \`category\``);
		await queryRunner.query(`DROP TABLE \`food_item\``);
		await queryRunner.query(`DROP TABLE \`order\``);
		await queryRunner.query(`DROP TABLE \`user\``);
		await queryRunner.query(`DROP TABLE \`order_status\``);
	}
}
