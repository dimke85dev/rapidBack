import CarRepairServise from '../services/CarRepairServise.js';

class CarRepairController {
  async create(req, res) {
    try {
      const post = await CarRepairServise.create(req.body);
      res.json(post);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getAll(req, res) {
    try {
      const posts = await CarRepairServise.getAll(); //возвращает все посты из базы данных
      return res.json(posts);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getOne(req, res) {
    try {
      const post = await CarRepairServise.getOne(req.params.id);
      return res.json(post);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async update(req, res) {
    try {
      const updatedPost = await CarRepairServise.update(req.body);
      return res.json(updatedPost);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async delete(req, res) {
    try {
      const deletePost = await CarRepairServise.delete(req.params.id);
      return res.json(deletePost);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new CarRepairController();
