import MainRepairModel from '../models/MainRepairModel.js';
import TypeRepairModel from '../models/TypeRepairModel.js';

export const createTypeRepair = async (req, res) => {
  try {
    const { nameTypeRepair, id, price } = req.body;

    const newTypeRepair = new TypeRepairModel({
      nameTypeRepair,
      price,
    });
    await newTypeRepair.save();

    await MainRepairModel.findByIdAndUpdate(id, {
      //нашли юзера, которому этот пост принадлежит и добавили в его массив постов

      $push: { typeRepair: newTypeRepair },
    });

    res.json({
      message: 'Данні успішно додані',
      messageType: 'ok',
      newTypeRepair,
    });
  } catch (error) {
    res.json({
      message: `Помилка сервера ${error.message}`,
      messageType: 'err',
    });
  }
};

export const getTypeRepairById = async (req, res) => {
  try {
    const mainRepair = await MainRepairModel.findById(req.body.id); //находим все посты и сортируем по дате создания sort('createedAT')
    const list = await Promise.all(
      mainRepair.typeRepair.map((type) => {
        return TypeRepairModel.findById(type);
      })
    );
    res.json(list);
  } catch (error) {
    res.json({
      message:
        'Щось пішло не так в typeRepairController getTypeRepairById function' +
        error.message,
    });
  }
};

export const getAllTypeRepairs = async (req, res) => {
  try {
    const typeRepairs = await TypeRepairModel.find().sort();
    if (!typeRepairs) {
      return res.json({ message: 'Записи відсутні' });
    }
    res.json(typeRepairs);
  } catch (error) {
    res.json({
      message:
        'Щось пішло не так в CarMainRepairController getAllTypeRepair function ' +
        error.message,
    });
  }
};

export const removeTypeRepair = async (req, res) => {
  try {
    const typeRepair = await TypeRepairModel.findByIdAndDelete(req.params.id);
    if (!typeRepair) return res.json({ message: 'Такого запису не існує' });
    res.json({ message: 'Запис був видалений' });
  } catch (error) {
    res.json({
      message:
        'Щось пішло не так в typeRepairController removeTypeRepairById function' +
        error.message,
    });
  }
};

export const updateTypeRepair = async (req, res) => {
  try {
    const { nameTypeRepair, id } = req.body;
    const typeRepair = await TypeRepairModel.findById(id);

    typeRepair.nameTypeRepair = nameTypeRepair;

    await typeRepair.save();

    res.json(typeRepair);
  } catch (error) {
    res.json({
      message:
        'Щось пішло не так в CarMainRepairController updateMainRepair function' +
        error.message,
    });
  }
};

export const getTypeRepair = async (req, res) => {
  try {
    const mainRepair = await MainRepairModel.findById(req.params.id).sort(); //находим все посты и сортируем по дате создания sort('createedAT')
    const list = await Promise.all(
      mainRepair.typeRepair.map((type) => {
        return TypeRepairModel.findById(type);
      })
    );
    res.json(list);
  } catch (error) {
    res.json({
      message:
        'Щось пішло не так в CarMainRepairController getTypeRepair function' +
        error.message,
    });
  }
};
