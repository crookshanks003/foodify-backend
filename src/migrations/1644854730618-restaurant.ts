import {MigrationInterface, QueryRunner} from "typeorm";

export class restaurant1644854730618 implements MigrationInterface {
    name = 'restaurant1644854730618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`food_item\` CHANGE \`calories\` \`restaurantId\` int NOT NULL DEFAULT '100'`);
        await queryRunner.query(`CREATE TABLE \`restaurant\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_staff\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`calories\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`calories\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`deliveryBoyId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`restaurantId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_status\` DROP FOREIGN KEY \`FK_014fe4a8ab95c64fdb7b8beb253\``);
        await queryRunner.query(`ALTER TABLE \`order_status\` CHANGE \`delivered_time\` \`delivered_time\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`order_status\` CHANGE \`dispatch_time\` \`dispatch_time\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`order_status\` CHANGE \`orderId\` \`orderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_646bf9ece6f45dbe41c203e06e0\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_779432332ca27702001c830fa3f\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` CHANGE \`orderId\` \`orderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` CHANGE \`foodItemId\` \`foodItemId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`food_item\` DROP FOREIGN KEY \`FK_b8308793196731745525d419e41\``);
        await queryRunner.query(`ALTER TABLE \`food_item\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`food_item\` CHANGE \`categoryId\` \`categoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`food_item\` CHANGE \`restaurantId\` \`restaurantId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`order_status\` ADD CONSTRAINT \`FK_014fe4a8ab95c64fdb7b8beb253\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_6bdf9b82362e9d5b6d2690acd70\` FOREIGN KEY (\`deliveryBoyId\`) REFERENCES \`delivery_boy\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_c93f22720c77241d2476c07cabf\` FOREIGN KEY (\`restaurantId\`) REFERENCES \`restaurant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_646bf9ece6f45dbe41c203e06e0\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_779432332ca27702001c830fa3f\` FOREIGN KEY (\`foodItemId\`) REFERENCES \`food_item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`food_item\` ADD CONSTRAINT \`FK_b8308793196731745525d419e41\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`food_item\` ADD CONSTRAINT \`FK_eb6a6b8266f6412f311de2935d7\` FOREIGN KEY (\`restaurantId\`) REFERENCES \`restaurant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`food_item\` DROP FOREIGN KEY \`FK_eb6a6b8266f6412f311de2935d7\``);
        await queryRunner.query(`ALTER TABLE \`food_item\` DROP FOREIGN KEY \`FK_b8308793196731745525d419e41\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_779432332ca27702001c830fa3f\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_646bf9ece6f45dbe41c203e06e0\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_c93f22720c77241d2476c07cabf\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_6bdf9b82362e9d5b6d2690acd70\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`ALTER TABLE \`order_status\` DROP FOREIGN KEY \`FK_014fe4a8ab95c64fdb7b8beb253\``);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`food_item\` CHANGE \`restaurantId\` \`restaurantId\` int NOT NULL DEFAULT '100'`);
        await queryRunner.query(`ALTER TABLE \`food_item\` CHANGE \`categoryId\` \`categoryId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`food_item\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`food_item\` ADD CONSTRAINT \`FK_b8308793196731745525d419e41\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` CHANGE \`foodItemId\` \`foodItemId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_item\` CHANGE \`orderId\` \`orderId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_779432332ca27702001c830fa3f\` FOREIGN KEY (\`foodItemId\`) REFERENCES \`food_item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_646bf9ece6f45dbe41c203e06e0\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_status\` CHANGE \`orderId\` \`orderId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_status\` CHANGE \`dispatch_time\` \`dispatch_time\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_status\` CHANGE \`delivered_time\` \`delivered_time\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_status\` ADD CONSTRAINT \`FK_014fe4a8ab95c64fdb7b8beb253\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`restaurantId\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`deliveryBoyId\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`calories\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`calories\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is_staff\` tinyint NOT NULL`);
        await queryRunner.query(`DROP TABLE \`restaurant\``);
        await queryRunner.query(`ALTER TABLE \`food_item\` CHANGE \`restaurantId\` \`calories\` int NOT NULL DEFAULT '100'`);
    }

}
