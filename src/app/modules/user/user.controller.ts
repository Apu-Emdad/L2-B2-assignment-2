import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { userValidationSchema } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodParsedData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: err.code || 500,
        description: err.message,
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: err.code || 500,
        description: err.message,
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const result = await UserServices.getSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User is retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: err.code || 500,
        description: err.message,
      },
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const userData = req.body;
    const zodParsedData = userValidationSchema.parse(userData);

    const result = await UserServices.UpdateSingleUserFromDB(userId, zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User is retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: err.code || 500,
        description: err.message,
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const result = await UserServices.deleteUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User is deleted succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: err.code || 500,
        description: err.message,
      },
    });
  }
};
export const UserControllers = { createUser, getAllUsers, getSingleUser, updateSingleUser, deleteUser };
