import CarsModel from '../models/CarsModel.js';

export const createCar = async (req, res) => {
  try {
    const { vinCode, name, year } = req.body;

    const newCar = new CarsModel({
      name,
      year,
      vinCode,
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
    const car = await CarsModel.find({ vinCode: vinCode.toLowerCase() });
    if (!car.length) {
      return res.json({
        message: 'Авто з таким вінкодом відсутнє',
        messageType: 'err',
      });
    }
    res.json({ car: car });
  } catch (error) {
    res.json({
      message:
        'Щось пішло не так в PostController getCar function ' + error.message,
    });
  }
};
