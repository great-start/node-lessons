"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableToken1647251103405 = void 0;
class CreateTableToken1647251103405 {
    async up(queryRunner) {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS Tokens (
            id INT PRIMARY KEY AUTO_INCREMENT,
            refreshToken VARCHAR(250) NOT NULL,
            userId INT NOT NULL,
            FOREIGN KEY (userId) REFERENCES Users (id)
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Tokens
        `);
    }
}
exports.CreateTableToken1647251103405 = CreateTableToken1647251103405;
//# sourceMappingURL=1647251103405-CreateTableToken.js.map