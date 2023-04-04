import mongoose from 'mongoose';

const CarRepair = new mongoose.Schema({
  date: { type: Date, required: true },
  car: { type: String, required: true },
  year: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  vinCode: { type: String, required: true },
  typeRepair: { type: String, required: true },
});

export default mongoose.model('CarRepair', CarRepair);
