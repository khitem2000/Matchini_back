
import express from 'express';
import mongoose from 'mongoose';

import userRoutes from './routes/use.js';
import clientRoutes from './routes/client.js';


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

app.use(express.json());

app.use('/user', userRoutes);
app.use('/client', clientRoutes);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});