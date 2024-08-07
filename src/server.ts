
import cors from 'cors';
import express from 'express';
import knex from './config/knex';
import followRoutes from './routes/follow.routes';
import tweetRoutes from './routes/tweet.routes';
import userRoutes from './routes/user.routes';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
}));

const PORT = process.env.PORT || 8080;

app.use('/api/users', userRoutes);
app.use('/api/tweets', tweetRoutes);
app.use('/api/follow', followRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//knex.once connected
knex.raw('SELECT 1+1 as result').then(() => {
  console.log('Knex is connected');
}).catch((err) => {
  console.log(err);
  process.exit(1);
});




