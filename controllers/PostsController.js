import Post from '../models/Post.js';
import UserModel from '../models/UserModel.js';
import path, { dirname } from 'path';
import * as uuid from 'uuid';
// import * as path from 'path';
import { fileURLToPath } from 'url';

//Create Post

export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const user = await UserModel.findById(req.userID);
    // console.log(req.userID);
    if (req.files) {
      // let fileName = Date.now().toString() + req.files.image.name; //формируем имя для изображения
      // const __dirname = dirname(fileURLToPath(import.meta.url)); //создаем переменную с текущем местоположением, т.е. путь
      // req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName)); // переносим полученный на фронтеend  файл  в папку uploads, выходя через две точки из текущей папки, и именуем как fileName
      // res.json(req.files.image);

      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve('tmp', fileName);
      // req.files.image.mv(filePath);

      const newPostWithImage = new Post({
        username: user.username,
        title,
        text,
        imgUrl: fileName,
        author: req.userId,
      });

      // console.log(newPostWithImage);

      await newPostWithImage.save(); //создали пост

      await UserModel.findByIdAndUpdate(req.userId, {
        //нашли юзера, которому этот пост принадлежит и добавили в его массив постов
        $push: { posts: newPostWithImage },
      });
      return res.json(newPostWithImage);
    }

    const newPostWithoutImage = new Post({
      username: user.username,
      title,
      text,
      imgUrl: '',
      author: req.userId,
    });

    newPostWithoutImage.save();

    await UserModel.findByIdAndUpdate(req.userId, {
      //нашли юзера, которому этот пост принадлежит и добавили в его массив постов
      $push: { posts: newPostWithoutImage },
    });

    res.json(newPostWithoutImage);
  } catch (error) {
    // console.log(5);
    res.json({
      message:
        'Щось пішло не так в PostController createPost function ' +
        error.message,
    });
  }
};

// Get All Posts

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find().sort('-createdAt'); //находим все посты и сортируем по дате создания sort('createedAT')
    const popularPosts = await Post.find().limit(5).sort('-views'); //находим все посты и выбираем 5 и сортируем по кол-ву просмотров sort('-views')
    if (!posts) {
      return res.json({ message: 'Статті відсутні' });
    }
    res.json({ posts, popularPosts });
  } catch (error) {
    res.json({
      message:
        'Щось пішло не так в PostController getAllPost function ' +
        error.message,
    });
  }
};
