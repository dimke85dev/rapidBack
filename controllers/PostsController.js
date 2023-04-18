import Post from '../models/Post.js';
import UserModel from '../models/UserModel.js';
import path, { dirname } from 'path';
import * as uuid from 'uuid';
// import * as path from 'path';
// import { fileURLToPath } from 'url';

//Create Post

export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const user = await UserModel.findById(req.userID);
    // console.log(req.userID);
    if (req.files) {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve('tmp', fileName);
      // req.files.image.mv(filePath);

      const newPostWithImage = new Post({
        username: user.username,
        title,
        text,
        imgUrl: fileName,
        author: req.userID,
      });

      // console.log(newPostWithImage);

      await newPostWithImage.save(); //создали пост

      await UserModel.findByIdAndUpdate(req.userID, {
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
      author: req.userID,
    });

    newPostWithoutImage.save();

    await UserModel.findByIdAndUpdate(req.userID, {
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
//Get Post by Id
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      //find post in database
      $inc: { views: 1 }, // increase the property on 1
    });

    res.json(post);
  } catch (error) {
    res.json({
      message:
        'Щось пішло не так в PostController getAPostById function ' +
        error.message,
    });
  }
};
//Get my Post by Id
export const getMyPosts = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userID);
    const list = await Promise.all(
      user.posts.map((post) => {
        return Post.findById(post._id);
      })
    );

    res.json(list);
  } catch (error) {
    res.json({
      message:
        'Щось пішло не так в PostController getMyPost function ' +
        error.message,
    });
  }
};

//Remove Post
export const removePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.json({ message: 'Такого поста не існує' });

    await UserModel.findByIdAndUpdate(req.userID, {
      $pull: { posts: req.params.id },
    });
    res.json({ message: 'Стаття була видалена' });
  } catch (error) {
    res.json({
      message:
        'Щось пішло не так в PostController removePost function ' +
        error.message,
    });
  }
};

//Update Post
export const updatePost = async (req, res) => {
  try {
    const { title, text, id } = req.body;
    const post = await Post.findById(id);

    if (req.files) {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve('tmp', fileName);
      // req.files.image.mv(filePath);
      post.imgUrl = fileName || '';
    }

    post.title = title;
    post.text = text;

    await post.save();

    res.json(post);
  } catch (error) {
    res.json({
      message:
        'Щось пішло не так в PostController removePost function ' +
        error.message,
    });
  }
};
