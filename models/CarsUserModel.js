import mongoose from 'mongoose';

const CarUser = new mongoose.Schema({
  car: { type: String, required: true },
  year: { type: String, required: true },
  vinCode: { type: String, required: true, unique: true },
});

export default mongoose.model('CarUser', CarUser);
