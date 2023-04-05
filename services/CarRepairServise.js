import CarRepairModel from '../models/CarRepairModel.js';

class CarRepairService {
  async create(post) {
    // const fileName = FileService.saveFile(picture);
    const createdCarRepair = await CarRepairModel.create({ ...post });
    console.log(createdCarRepair);
    return createdCarRepair;
  }

  async getAll() {
    const items = await CarRepairModel.find(); //возвращает все посты из базы данных
    return items;
  }

  async getOne(id) {
    if (!id) {
      throw new Error('Id не указан ');
    }
    const item = await CarRepairModel.findById(id);
    return item;
  }
  async update(post) {
    if (!post._id) {
      throw new Error('Id не указан ');
    }
    const updatedCarRepair = await CarRepairModel.findByIdAndUpdate(
      post._id,
      post,
      {
        new: true,
      }
    );
    return updatedCarRepair;
  }
  async delete(id) {
    if (!id) {
      throw new Error('Id не указан ');
    }
    const deleteCarRepair = await CarRepairModel.findByIdAndDelete(id);
    return deleteCarRepair;
  }
}

export default new CarRepairService();
