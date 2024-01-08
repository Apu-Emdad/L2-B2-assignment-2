import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { userValidationSchema } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const studentData = req.body;
    const zodParsedData = userValidationSchema.parse(studentData);

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
        code: err.code,
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
        code: err.code,
        description: err.message,
      },
    });
  }
};

export const UserControllers = { createUser, getAllUsers };
