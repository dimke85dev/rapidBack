import mongoose from 'mongoose';

const CarRepairModel = new mongoose.Schema({
  date: { type: Date, required: true },
  repair: { type: Object, required: true },
  nameClient: { type: String, required: true },
  phoneClient: { type: String, required: true },
  model: { type: String, required: true },
  vinCode: { type: String, required: true },
  year: { type: String, required: true },
  flagEnd: { type: Number, required: true },
  allPrice: { type: String, required: true },
});

export default mongoose.model('CarRepairModel', CarRepairModel);
