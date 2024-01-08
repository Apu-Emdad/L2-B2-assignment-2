import { Model } from 'mongoose';

export type TStudentName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TStudentName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
};

/* 
To create interface for both methods and statics
*/

/* 
- Create an interface StudentMethods for methods 
- interface StudentModel extends Model<TStudent, Record<string, never>, StudentMethods> : To define the methods as the property of StudentModel
*/
export interface StudentMethods {
  // eslint-disable-next-line no-unused-vars
  studentExists(id: string): Promise<TStudent | null>;
}

// For static we don't need separate type or interface. Simply typecast it into StudentModel
export interface StudentModel extends Model<TStudent, Record<string, never>, StudentMethods> {
  // eslint-disable-next-line no-unused-vars
  isStudent(id: string): Promise<TStudent | null>;
}
