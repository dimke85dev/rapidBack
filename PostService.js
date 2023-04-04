import CarRepair from './CarRepair.js';
import FileService from './fileService.js';

class PostService {
  async create(post) {
    // const fileName = FileService.saveFile(picture);
    const createdPost = await CarRepair.create({ ...post });
    return createdPost;
  }

  async getAll() {
    const posts = await CarRepair.find(); //возвращает все посты из базы данных
    return posts;
  }

  async getOne(id) {
    if (!id) {
      throw new Error('Id не указан ');
    }
    const post = await CarRepair.findById(id);
    return post;
  }
  async update(post) {
    if (!post._id) {
      throw new Error('Id не указан ');
    }
    const updatedPost = await CarRepair.findByIdAndUpdate(post._id, post, {
      new: true,
    });
    return updatedPost;
  }
  async delete(id) {
    if (!id) {
      throw new Error('Id не указан ');
    }
    const deletePost = await Post.findByIdAndDelete(id);
    return deletePost;
  }
}

export default new PostService();
