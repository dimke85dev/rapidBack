import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    roles: [{ type: String, ref: 'Role' }],
    repairs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CarRepairModel' }],
  },
  { timestamps: true }
);

export default mongoose.model('UserModel', UserSchema);
