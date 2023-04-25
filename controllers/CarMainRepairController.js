import MainRepairModel from '../models/MainRepairModel.js';
import TypeRepairModel from '../models/TypeRepairModel.js';

export const createMainRepair = async (req, res) => {
  try {
    const { nameMainRepair } = req.body;

    const newMainRepair = new MainRepairModel({
      nameMainRepair,
    });
    await newMainRepair.save();

    res.json({
      message: 'Данні успішно додані',
      messageType: 'ok',
      newMainRepair,
    });
  } catch (error) {
    res.json({
      message: `Помилка сервера ${error.message}`,
      messageType: 'err',
    });
  }
};

export const getAllMainRepairs = async (req, res) => {
  try {
    const mainRepairs = await MainRepairModel.find().sort();
    if (!mainRepairs) {
      return res.json({ message: 'Записи відсутні' });
    }
    res.json(mainRepairs);
  } catch (error) {
    res.json({
      message:
        'Щось пішло не так в CarMainRepairController getAllMainRepair function ' +
        error.message,
    });
  }
};

export const getMainRepairById = async (req, res) => {
  try {
    const mainRepair = await MainRepairModel.findByIdAndUpdate(req.params.id);

    res.json(mainRepair);
  } catch (error) {
    res.json({
      message:
        'Щось пішло не так в CarMainRepairController getMainRepairById function' +
        error.message,
    });
  }
};

export const removeMainRepair = async (req, res) => {
  try {
    const mainRepair = await MainRepairModel.findByIdAndDelete(req.params.id);
    if (!mainRepair) return res.json({ message: 'Такого запису не існує' });
    res.json({ message: 'Стаття була видалена' });
  } catch (error) {
    res.json({
      message:
        'Щось пішло не так в CarMainRepairController removeMainRepair function' +
        error.message,
    });
  }
};

export const updateMainRepair = async (req, res) => {
  try {
    const { nameMainRepair, id } = req.body;
    const mainRepair = await MainRepairModel.findById(id);

    mainRepair.nameMainRepair = nameMainRepair;

    await mainRepair.save();

    res.json(mainRepair);
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
