import User, { UserModel } from '../model/user';
import { Types } from 'mongoose';

export async function findAll() {
  return UserModel.find();
}

async function create(user: User) {
  const now = new Date();
  user.createdAt = now;

  const createdUser = await UserModel.create(user);
  return createdUser;
}

async function update(user: User, id: string) {
  user.updatedAt = new Date();
  return UserModel.findByIdAndUpdate(id, user, { new: true });
}

async function remove(id: Types.ObjectId) {
  return UserModel.findByIdAndRemove(id);
}

async function findById(id: Types.ObjectId | string) {
  return UserModel.findById(id);
}

async function findByEmail(email: string) {
  return UserModel.findOne({ email });
}

async function findMaleUsers() {
  return UserModel.find({ gender: 'MALE' });
}

async function findFemaleUsers() {
  return UserModel.find({ gender: 'FEMALE' });
}

async function findUsersUnder30() {
  return UserModel.find({ age: { $lt: 30 } });
}

async function findUsersOver30() {
  return UserModel.find({ age: { $gte: 30 } });
}

export default {
  create,
  findAll,
  update,
  findByEmail,
  findById,
  remove,
  findMaleUsers,
  findFemaleUsers,
  findUsersUnder30,
  findUsersOver30,
};
