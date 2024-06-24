import bcrypt from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';

interface IUser extends mongoose.Document {
  email: string;
  fullname: string;
  password: string;
}

const UserSchema: Schema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  password: { type: String, required: true },
}, {
  timestamps: true
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password as string, salt);
  next();
});



const User = mongoose.model<IUser>('User', UserSchema);

export default User;