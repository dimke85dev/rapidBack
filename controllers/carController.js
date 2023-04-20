import CarsModel from '../models/CarsModel.js';

export const createCar = async (req, res) => {
  try {
    const { vinCode, name, year } = req.body;

    const newCar = new CarsModel({
      name,
      year,
      vinCode: vinCode.toLowerCase(),
    });
    await newCar.save();

    res.json({ message: 'Данні успішно додані', messageType: 'ok', newCar });
  } catch (error) {
    res.json({
      message:
        error.code === 11000
          ? 'Такий VinCode вже існує'
          : `Помилка сервера ${error.message}`,
      messageType: 'err',
    });
  }
};

export const getCar = async (req, res) => {
  const { vinCode } = req.body;
  try {
    const carVin = await CarsModel.find({ vinCode: vinCode.toLowerCase() });
    if (!carVin.length) {
      return res.json({
        message: 'Авто з таким вінкодом відсутнє',
        messageType: 'err',
      });
    }
    res.json({ car: carVin });
  } catch (error) {
    res.json({
      message:
        'Щось пішло не так в PostController getAllPost function ' +
        error.message,
    });
  }
};
