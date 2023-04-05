import mongoose from 'mongoose';

const CarRepairModel = new mongoose.Schema({
  date: { type: Date, required: true },
  car: { type: String, required: true },
  year: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  vinCode: { type: String, required: true, unique: true },
});

export default mongoose.model('CarRepairModel', CarRepairModel);
