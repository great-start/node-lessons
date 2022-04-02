import { IUser } from '../../entity/user';

export interface IUserRepository { // абстрация ООП, описание метода
    createUser(user: IUser): Promise<IUser>;
    getUserByEmail(email: string): Promise<IUser | undefined>
}
