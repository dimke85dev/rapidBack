import mongoose from 'mongoose';

const MainRepairModel = new mongoose.Schema({
  nameMainRepair: { type: String, required: true },
  typeRepair: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'TypeRepairModel' },
  ],
});

export default mongoose.model('MainRepairModel', MainRepairModel);
