import express from 'express';
import dotenv from 'dotenv';

import {connectDB} from './configs/db.js'

import authRoute from './routes/authRoute.js';

dotenv.config();
connectDB();

const app = express();
const HR3_PORT = process.env.HR3_PORT || 7687;
const NAME = process.env.NAME;

app.get('/', (req,res) => {
    res.send(`Welcome to ${NAME}`);
});

app.use(express.json());

app.use("/api/auth",authRoute);

app.listen(HR3_PORT, () => {
    console.log(`Server is running at PORT: ${HR3_PORT}`)
});