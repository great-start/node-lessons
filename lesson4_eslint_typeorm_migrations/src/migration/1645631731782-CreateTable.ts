import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1645628691738 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS Test (
        id INT PRIMARY KEY AUTO_INCREMENT,
        firstName VARCHAR(200) NOT NULL,
        lastName VARCHAR(200) NOT NULL
            )
            
`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Test
        `);
    }
}
