import { IUser } from '../../entity/user';
import { IUserPaginationInterface } from '../../interfaces';

export interface IUserRepository { // абстрация ООП, описание метода
    createUser(user: IUser): Promise<IUser>;
    getUserByEmail(email: string): Promise<IUser | undefined>;
    getNewUsers(): Promise<IUser[] | undefined>;
    getUserPagination(): Promise<IUserPaginationInterface<IUser>>
}
