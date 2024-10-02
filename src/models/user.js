import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
    versionKey: false,
  }
);

export const User = model('User', userSchema);
export default User;