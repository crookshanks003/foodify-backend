import {MigrationInterface, QueryRunner} from "typeorm";

export class orderCleanUpMigration1637750225477 implements MigrationInterface {
    name = 'orderCleanUpMigration1637750225477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`delivery_boy\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` int NOT NULL DEFAULT '0', \`order_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`delivered_time\` datetime NULL, \`dispatch_time\` datetime NULL, \`orderId\` int NULL, UNIQUE INDEX \`REL_014fe4a8ab95c64fdb7b8beb25\` (\`orderId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`is_staff\` tinyint NOT NULL, \`calories\` int NOT NULL DEFAULT '0', \`address\` varchar(255) NULL, \`registered_on\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`price\` int NOT NULL, \`calories\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`orderId\` int NULL, \`foodItemId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`food_item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`image\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`calories\` int NOT NULL DEFAULT '100', \`categoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`image\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order_status\` ADD CONSTRAINT \`FK_014fe4a8ab95c64fdb7b8beb253\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_646bf9ece6f45dbe41c203e06e0\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_779432332ca27702001c830fa3f\` FOREIGN KEY (\`foodItemId\`) REFERENCES \`food_item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`food_item\` ADD CONSTRAINT \`FK_b8308793196731745525d419e41\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`food_item\` DROP FOREIGN KEY \`FK_b8308793196731745525d419e41\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_779432332ca27702001c830fa3f\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_646bf9ece6f45dbe41c203e06e0\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`ALTER TABLE \`order_status\` DROP FOREIGN KEY \`FK_014fe4a8ab95c64fdb7b8beb253\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`food_item\``);
        await queryRunner.query(`DROP TABLE \`order_item\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_014fe4a8ab95c64fdb7b8beb25\` ON \`order_status\``);
        await queryRunner.query(`DROP TABLE \`order_status\``);
        await queryRunner.query(`DROP TABLE \`delivery_boy\``);
    }

}
