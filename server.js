
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/use.js';
import clientRoutes from './routes/client.js';
import posteSchema from './routes/post.js'

const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'matchiniRahmaKhitem';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://localhost:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/img', express.static('public/images'));
app.use('/user', userRoutes);
app.use('/client', clientRoutes);
app.use('/post', posteSchema);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});