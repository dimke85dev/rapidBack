import mongoose from 'mongoose';

const TypeRepairModel = new mongoose.Schema({
  nameTypeRepair: { type: String, required: true },
});

export default mongoose.model('TypeRepairModel', TypeRepairModel);
