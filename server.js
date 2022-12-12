
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/use.js';
const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'matchiniRahmaKhitem';
const hostname = '192.168.1.11';
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose
  .connect(`mongodb+srv://khitem:khitem@cluster0.98k4mgr.mongodb.net/testt${databaseName}`)
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

app.listen(port, hostname,() => {
  console.log(`Server running at http://${hostname}:${port}/`);                                                       
});