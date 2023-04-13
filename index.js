import express from 'express';
import mongoose from 'mongoose';
import carRepairRouter from './routes/carRapaireRuter.js';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import postRouter from './routes/postRouter.js';

dotenv.config();

//Constants

const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.jfnk8z0.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@rapidservice.aipbrq8.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
// const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@rapidservice.vdzydez.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const app = express();

//Middleware

app.use(
  cors({
    origin: ['https://rapid-front.vercel.app'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static('uploads'));
app.use(fileUpload({}));

//Routes
app.use('/api', carRepairRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log('SERVER STARTED ON PORT' + PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();
// app.listen(PORT, () => console.log('SERVER STARTED ON PORT' + PORT));
// сгенерируй код компонента React в котором будет выпадающий список внутри выпадающего списка
