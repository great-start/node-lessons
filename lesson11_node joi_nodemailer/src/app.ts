import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';

import { apiRouter } from './router';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

const { PORT } = process.env;

app.listen(PORT, async () => {
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (e) {
        if (e) console.log(e);
    }
    console.log(`Server has started on port: ${PORT}`);
});
