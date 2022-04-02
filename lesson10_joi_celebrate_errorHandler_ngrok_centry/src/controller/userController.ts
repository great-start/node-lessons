import { Response, Request } from 'express';
import { IUser } from '../entity/user';
import { userService } from '../services';

class UserController {
    public async createUser(req:Request, res:Response): Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUserByEmail(req:Request, res:Response): Promise<Response<IUser>> {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email);
        console.log(user);
        return res.json(user);
    }
}

export const userController = new UserController();
