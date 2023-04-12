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
    cars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CarUser',
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    group: {
      type: String,
      // require: true,
    },
    status: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model('UserModel', UserSchema);
