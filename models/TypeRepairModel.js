import mongoose from 'mongoose';

const TypeRepairModel = new mongoose.Schema({
  nameTypeRepair: { type: String, required: true },
  price: { type: Number },
});

export default mongoose.model('TypeRepairModel', TypeRepairModel);
