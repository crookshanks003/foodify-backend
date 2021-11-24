import { MigrationInterface, QueryRunner } from "typeorm";

export class deliveryMigration1637700404511 implements MigrationInterface {
	name = "deliveryMigration1637700404511";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE \`delivery_boy\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(`ALTER TABLE \`user\` ADD \`address\` varchar(255) NULL`);
		await queryRunner.query(
			`ALTER TABLE \`order_status\` CHANGE \`delivered_time\` \`delivered_time\` datetime NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE \`order_status\` CHANGE \`dispatch_time\` \`dispatch_time\` datetime NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``,
		);
		await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`userId\` \`userId\` int NULL`);
		await queryRunner.query(
			`ALTER TABLE \`food_item\` DROP FOREIGN KEY \`FK_b8308793196731745525d419e41\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`food_item\` CHANGE \`description\` \`description\` varchar(255) NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE \`food_item\` CHANGE \`categoryId\` \`categoryId\` int NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE \`category\` CHANGE \`description\` \`description\` varchar(255) NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`food_item\` ADD CONSTRAINT \`FK_b8308793196731745525d419e41\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`food_item\` DROP FOREIGN KEY \`FK_b8308793196731745525d419e41\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`category\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`,
		);
		await queryRunner.query(
			`ALTER TABLE \`food_item\` CHANGE \`categoryId\` \`categoryId\` int NULL DEFAULT 'NULL'`,
		);
		await queryRunner.query(
			`ALTER TABLE \`food_item\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`,
		);
		await queryRunner.query(
			`ALTER TABLE \`food_item\` ADD CONSTRAINT \`FK_b8308793196731745525d419e41\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`order\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`,
		);
		await queryRunner.query(
			`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`order_status\` CHANGE \`dispatch_time\` \`dispatch_time\` datetime NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE \`order_status\` CHANGE \`delivered_time\` \`delivered_time\` datetime NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`address\``);
		await queryRunner.query(`DROP TABLE \`delivery_boy\``);
	}
}
