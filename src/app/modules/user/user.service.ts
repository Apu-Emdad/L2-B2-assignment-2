import { User } from './user.model';
import { TUser } from './user.interface';

const createUserIntoDB = async (user: TUser) => {
  if (await User.isUser(user.userId)) {
    throw new Error('Student already exists!');
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

const deleteUserFromDB = async (id: number) => {
  const result = await User.deleteOne({ userId: id });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
