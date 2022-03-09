import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';

import { User } from './entity/user';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', async (req:Request, res:Response) => {
    const users = await getManager().getRepository(User).find();
    console.log(users);
    res.json(users);
});

app.post('/users', async (req: Request, res: Response) => {
    console.log(req.body);
    const createdUser = await getManager().getRepository(User).save(req.body);
    res.json(createdUser);
});

app.listen(5200, async () => {
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (e) {
        if (e) console.log(e);
    }
    console.log('Server has started!!!YEAH!!!');
});
