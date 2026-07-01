import express from 'express';
import cors from 'cors';
import { goalRouter, taskRouter} from './routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler)

app.use('/goals', goalRouter)
app.use('/tasks', taskRouter)


