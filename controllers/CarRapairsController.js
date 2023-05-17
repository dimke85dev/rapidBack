import CarsModel from '../models/CarsModel.js';
import CarRepairModel from '../models/CarRepairModel.js';
import UserModel from '../models/UserModel.js';

export const createCarRepairs = async (req, res) => {
  try {
    const {
      nameClient,
      phoneClient,
      carId,
      repair,
      date,
      userId,
      model,
      vinCode,
      year,
      flagEnd,
      allPrice,
    } = req.body;
    const newCarRepairs = new CarRepairModel({
      repair, //object
      date: new Date(), //tooday Date
      nameClient, //name Client
      phoneClient, //phoneClient
      model,
      vinCode,
      year,
      flagEnd,
      allPrice,
    });

    await newCarRepairs.save();

    // console.log(carId, newCarRepairs);

    const car = await CarsModel.findByIdAndUpdate(carId, {
      $push: { repairs: newCarRepairs._id },
    });
    const user = await UserModel.findByIdAndUpdate(userId, {
      $push: { repairs: newCarRepairs._id },
    });

    res.json({
      message: 'Данні успішно додані',
      messageType: 'ok',
      newCarRepairs,
    });
  } catch (error) {
    res.json({
      message: error.message,
      messageType: 'err',
    });
  }
};

export const getCarRepairs = async (req, res) => {
  try {
    const carRepairs = await CarRepairModel.find();

    res.json({
      carRepairs,
    });
  } catch (error) {
    res.json({
      message: error.message,
      messageType: 'err',
    });
  }
};
