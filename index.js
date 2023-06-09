import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import postRouter from './routes/postRouter.js';
import commentRouter from './routes/commentRoter.js';
import carRouter from './routes/carRouter.js';
import carMainRepairRouter from './routes/carMainRapaireRouter.js';
import carTypeRepairRouter from './routes/carTypeRapaireRouter.js';

dotenv.config();

//Constants

const PORT = process.env.PORT || 5001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.aipbrq8.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.aipbrq8.mongodb.net/TestBase?retryWrites=true&w=majority`;

// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
const app = express();

//Middleware

app.use(cors());
app.use(express.json({ extended: true }));

app.use(express.static('tmp'));
app.use(fileUpload({}));

//Routes
// app.use('/api', carRepairRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/cars', carRouter);
app.use('/api/mainrepair', carMainRepairRouter);
app.use('/api/typerepair', carTypeRepairRouter);

app.use((req, res, next) => {
  // Добавляем заголовки, которые нужны для всех запросов
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

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
