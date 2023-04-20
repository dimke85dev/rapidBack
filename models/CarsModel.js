import mongoose from 'mongoose';

const CarsModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
    year: { type: String, required: true },
    vinCode: { type: String, required: true, unique: true },
    repairs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CarRepairModel' }],
  },
  { timestamps: true }
);

export default mongoose.model('CarsModel', CarsModel);
