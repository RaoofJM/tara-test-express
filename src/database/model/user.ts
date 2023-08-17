import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export default interface User {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  createdAt: Date;
  updatedAt?: Date;
}

const schema = new Schema<User>({
  name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
    minlength: 4,
  },
  age: {
    type: Schema.Types.Number,
    required: true,
  },
  gender: {
    type: Schema.Types.String,
    enum: ['MALE', 'FEMALE'],
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  updatedAt: {
    type: Schema.Types.Date,
    default: null,
  },
});

// Hashing Password Before Saving the User
schema.pre('save', function (next) {
  let user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
