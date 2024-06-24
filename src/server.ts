import { connectMongoDB } from "./config/db";

import cors from 'cors';
import express, { Request, Response } from 'express';
import citiesRoute from './routes/cities.routes';
import vehiclesRoute from './routes/vehicles.routes';
import resultRoute from './routes/result.routes';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
}));

app.get('/', (_: Request, res: Response) => {
  res.send('Welcome to Yocket API');
});



app.use('/api/cities', citiesRoute);
app.use('/api/vehicles', vehiclesRoute);
app.use('/api/result', resultRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  await connectMongoDB()
});
