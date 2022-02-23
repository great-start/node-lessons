import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req:Request, res:Response) => {
    res.end();
});

app.listen(5200, () => {
    console.log('Server has started!!!YEAH!!!');
});
