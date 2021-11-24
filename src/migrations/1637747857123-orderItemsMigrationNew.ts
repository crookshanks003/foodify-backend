import {MigrationInterface, QueryRunner} from "typeorm";

export class orderItemsMigrationNew1637747857123 implements MigrationInterface {
    name = 'orderItemsMigrationNew1637747857123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_status\` ADD \`orderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_status\` ADD UNIQUE INDEX \`IDX_014fe4a8ab95c64fdb7b8beb25\` (\`orderId\`)`);
        await queryRunner.query(`ALTER TABLE \`food_item\` DROP FOREIGN KEY \`FK_b8308793196731745525d419e41\``);
        await queryRunner.query(`ALTER TABLE \`food_item\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`food_item\` CHANGE \`categoryId\` \`categoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_646bf9ece6f45dbe41c203e06e0\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_779432332ca27702001c830fa3f\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` CHANGE \`orderId\` \`orderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` CHANGE \`foodItemId\` \`foodItemId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_status\` CHANGE \`delivered_time\` \`delivered_time\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`order_status\` CHANGE \`dispatch_time\` \`dispatch_time\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_014fe4a8ab95c64fdb7b8beb25\` ON \`order_status\` (\`orderId\`)`);
        await queryRunner.query(`ALTER TABLE \`food_item\` ADD CONSTRAINT \`FK_b8308793196731745525d419e41\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_646bf9ece6f45dbe41c203e06e0\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_779432332ca27702001c830fa3f\` FOREIGN KEY (\`foodItemId\`) REFERENCES \`food_item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_status\` ADD CONSTRAINT \`FK_014fe4a8ab95c64fdb7b8beb253\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`ALTER TABLE \`order_status\` DROP FOREIGN KEY \`FK_014fe4a8ab95c64fdb7b8beb253\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_779432332ca27702001c830fa3f\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_646bf9ece6f45dbe41c203e06e0\``);
        await queryRunner.query(`ALTER TABLE \`food_item\` DROP FOREIGN KEY \`FK_b8308793196731745525d419e41\``);
        await queryRunner.query(`DROP INDEX \`REL_014fe4a8ab95c64fdb7b8beb25\` ON \`order_status\``);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_status\` CHANGE \`dispatch_time\` \`dispatch_time\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_status\` CHANGE \`delivered_time\` \`delivered_time\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_item\` CHANGE \`foodItemId\` \`foodItemId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_item\` CHANGE \`orderId\` \`orderId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_779432332ca27702001c830fa3f\` FOREIGN KEY (\`foodItemId\`) REFERENCES \`food_item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_646bf9ece6f45dbe41c203e06e0\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`food_item\` CHANGE \`categoryId\` \`categoryId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`food_item\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`food_item\` ADD CONSTRAINT \`FK_b8308793196731745525d419e41\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_status\` DROP INDEX \`IDX_014fe4a8ab95c64fdb7b8beb25\``);
        await queryRunner.query(`ALTER TABLE \`order_status\` DROP COLUMN \`orderId\``);
    }

}
