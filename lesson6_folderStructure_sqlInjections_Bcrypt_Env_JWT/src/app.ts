import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';

import { User } from './entity/user';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', async (req:Request, res:Response) => {
    // const users = await getManager().getRepository(User).find();
    // console.log(users);
    // res.json(users);

    const users = await getManager().getRepository(User).find({ relations: ['posts'] });
    console.log(users);
    res.json(users);
    //
    // ----- найдет первого из массива
    // const users = await getManager().getRepository(User).findOne();
    // console.log(users);
    // res.json(users);

    // const users = await getManager().getRepository(User).findOne({
    //     where: {
    //         firstName: 'Taras',
    //     },
    // });
    // console.log(users);
    // res.json(users);

    // const user = await getManager().getRepository(User)
    //     .createQueryBuilder('user')
    //     // .where('user.firstName = "Vanya"')
    //     .where('user.age > 35')
    //     // .getOne();
    //     // .getMany();
    //     .getManyAndCount();
    // console.log(user);
    // res.json(user);
});

app.post('/users', async (req: Request, res: Response) => {
    console.log(req.body);
    const createdUser = await getManager().getRepository(User).save(req.body);
    res.json(createdUser);
});

app.patch('/users/:id', async (req: Request<any>, res: Response) => {
    const { password, email } = req.body;
    const createdUser = await getManager()
        .getRepository(User)
        .update({ id: Number(req.params.id) }, {
            password,
            email,
        });
    res.json(createdUser);
});

// app.delete('/users/:id', async (req: Request<any>, res: Response) => {
//     const createdUser = await getManager()
//         .getRepository(User)
//         .delete({ id: Number(req.params.id) });
//     res.json(createdUser);
// });

app.delete('/users/:id', async (req, res) => {
    const createdUser = await getManager()
        .getRepository(User)
        .softDelete({ id: Number(req.params.id) });
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
