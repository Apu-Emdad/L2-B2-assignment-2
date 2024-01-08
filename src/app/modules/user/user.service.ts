import { User } from './user.model';
import { TUser, TUserOrder } from './user.interface';

const createUserIntoDB = async (user: TUser) => {
  if (await User.isUser(user.userId)) {
    throw new Error('User already exists!');
  }
  const result = await User.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (id: number) => {
  const result = await User.findOne({ userId: id });
  return result;
};

const UpdateSingleUserFromDB = async (id: number, user: TUser) => {
  if (!(await User.isUser(id))) {
    throw new Error("User doesn't exist!");
  }
  const result = await User.updateOne({ userId: id }, { $set: user });
  return result;
};

const deleteUserFromDB = async (id: number) => {
  if (!(await User.isUser(id))) {
    throw new Error("User doesn't exist!");
  }
  const result = await User.deleteOne({ userId: id });
  return result;
};

const createOrderIntoUser = async (id: number, order: TUserOrder) => {
  if (!(await User.isUser(id))) {
    throw new Error("User doesn't exist!");
  }
  const result = await User.updateOne({ userId: id }, { $push: { orders: order } });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  UpdateSingleUserFromDB,
  deleteUserFromDB,
  createOrderIntoUser,
};
