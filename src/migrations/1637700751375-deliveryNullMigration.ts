import { MigrationInterface, QueryRunner } from "typeorm";

export class deliveryNullMigration1637700751375 implements MigrationInterface {
	name = "deliveryNullMigration1637700751375";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`order_status\` CHANGE \`delivered_time\` \`delivered_time\` datetime NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE \`order_status\` CHANGE \`dispatch_time\` \`dispatch_time\` datetime NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL`,
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
			`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT 'NULL'`,
		);
		await queryRunner.query(
			`ALTER TABLE \`order_status\` CHANGE \`dispatch_time\` \`dispatch_time\` datetime NULL DEFAULT 'NULL'`,
		);
		await queryRunner.query(
			`ALTER TABLE \`order_status\` CHANGE \`delivered_time\` \`delivered_time\` datetime NULL DEFAULT 'NULL'`,
		);
	}
}
