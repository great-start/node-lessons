import {
    EntityRepository, getManager, Repository, MoreThan,
} from 'typeorm';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IUser, User } from '../../entity/user';
import { IUserRepository } from './userRepository.interface';
import { IUserPaginationInterface } from '../../interfaces';

dayjs.extend(utc);

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async createUser(user:IUser):Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    public async getNewUsers(): Promise<IUser[] | undefined> {
        return getManager().getRepository(User)
            .find({
                createdAt: MoreThan(dayjs().utc().startOf('day').format()),
            });

    //     return getManager().getRepository(User)
    //         .createQueryBuilder('user')
    //         .where('user.createdAt >= :date', { date: dayjs().utc().startOf('day').format() })
    //         .getMany();
    // }
    }

    public async getUserPagination(searchObj:Partial<IUser> = {}, page = 1, perPage = 25)
        :Promise<IUserPaginationInterface<IUser>> {
        const [users, count] = await getManager().getRepository(User).findAndCount({
            where: searchObj,
            skip: perPage * (page - 1),
            take: perPage,
        });

        return {
            page,
            perPage,
            totalItems: count,
            data: users,
        };
    }
}

export const userRepository = new UserRepository();
