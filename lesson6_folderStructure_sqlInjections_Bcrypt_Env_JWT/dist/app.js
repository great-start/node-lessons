"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const apiRouter_1 = require("./router/apiRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(apiRouter_1.apiRouter);
const { PORT } = process.env;
app.get('/users', async (req, res) => {
    // const users = await getManager().getRepository(User).find();
    // console.log(users);
    // res.json(users);
    const users = await (0, typeorm_1.getManager)().getRepository(user_1.User).find({ relations: ['posts'] });
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
// app.post('/users', async (req: Request, res: Response) => {
//     console.log(req.body);
//     const createdUser = await getManager().getRepository(User).save(req.body);
//     res.json(createdUser);
// });
app.patch('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const createdUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
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
    const createdUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .softDelete({ id: Number(req.params.id) });
    res.json(createdUser);
});
app.listen(PORT, async () => {
    try {
        const connection = await (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('Database connected');
        }
    }
    catch (e) {
        if (e)
            console.log(e);
    }
    console.log(`Server has started on port: ${PORT}`);
});
//# sourceMappingURL=app.js.map