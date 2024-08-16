import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';

import connectDB from './config/db';

import routes from './routes';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
