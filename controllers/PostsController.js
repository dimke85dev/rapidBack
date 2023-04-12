import Post from '../models/Post.js';
import UserModel from '../models/UserModel.js';
import path, { dirname } from 'path';
// import * as path from 'path';
import { fileURLToPath } from 'url';

//Create Post
export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const user = await UserModel.findById(req.userID);
    // console.log(req.userID);
    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name; //формируем имя для изображения
      const __dirname = dirname(fileURLToPath(import.meta.url)); //создаем переменную с текущем местоположением, т.е. путь
      req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName)); // переносим полученный на фронтеend  файл  в папку uploads, выходя через две точки из текущей папки, и именуем как fileName

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
    console.log(5);
    res.json({ message: 'Что-то пошло не так' + error.message });
  }
};
