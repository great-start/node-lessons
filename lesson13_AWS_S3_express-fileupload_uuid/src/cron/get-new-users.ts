import cron from 'node-cron';
import { userRepository } from '../repositories/user/userRepository';

export const getNewUsers = async () => {
    await cron.schedule('*/10 * * * * *', async () => {
        const newUsers = await userRepository.getNewUsers();

        console.log(newUsers);
    });
};
