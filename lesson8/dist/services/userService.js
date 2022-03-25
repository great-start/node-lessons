"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository_1 = require("../repositories/user/userRepository");
class UserService {
    async createUser(user) {
        const { password } = user;
        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };
        return userRepository_1.userRepository.createUser(dataToSave);
    }
    async getUserByEmail(email) {
        return userRepository_1.userRepository.getUserByEmail(email);
    }
    async compareUserPassword(password, hash) {
        const isPasswordUnique = await bcrypt_1.default.compare(password, hash);
        if (!isPasswordUnique) {
            throw new Error('User not exists');
        }
    }
    async _hashPassword(password) {
        return bcrypt_1.default.hash(password, 10);
    }
}
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map