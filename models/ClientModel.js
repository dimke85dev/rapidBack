import mongoose from 'mongoose';

const ClientModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CarModel' }],
    rapair: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('ClientModel', ClientModel);
