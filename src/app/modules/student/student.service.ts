import { Student } from './student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (student: TStudent) => {
  if (await Student.isUser(student.id)) {
    throw new Error('User already exists!');
  }
  const result = await Student.create(student);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  //using static
  // const result = await new Student().userExists(id);
  // using method
  // const result = await Student.isUser(id);
  //using built in static
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
