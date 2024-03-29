import { AnyKeys, AnyObject, Schema, UpdateQuery, model } from 'mongoose';
import { TUserModel, TUser, TUserFullName, TUserAddress } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userFullNameSchema = new Schema<TUserFullName>(
  {
    firstName: { type: String, trim: true, required: [true, 'First name is required'] },
    lastName: { type: String, trim: true, required: [true, 'First name is required'] },
  },
  { _id: false },
);

const userAddressSchema = new Schema<TUserAddress>(
  {
    street: String,
    city: String,
    country: String,
  },
  { _id: false },
);

const userOrderSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const userSchema = new Schema<TUser, TUserModel>(
  {
    userId: { type: Number, unique: true, required: true },
    username: { type: String, unique: true, trim: true, required: true },
    password: { type: String, required: true },
    fullName: userFullNameSchema,
    age: Number,
    email: { type: String, unique: true, trim: true, required: true },
    isActive: Boolean,
    hobbies: [String],
    address: userAddressSchema,
    orders: { type: [userOrderSchema], default: [], required: false },
  },
  {
    statics: {
      isUser: async function (id: string) {
        const existingUser = await this.findOne({ userId: id });
        return existingUser;
      },
      getOrders: async function (id: number) {
        const orders = await this.aggregate([
          {
            $match: { userId: id },
          },
          {
            $project: { orders: 1, userId: 1 },
          },
          {
            $unwind: '$orders',
          },
          {
            $group: {
              _id: '$_id',
              userId: { $first: '$userId' },
              orders: { $push: '$orders' },
              count: { $sum: 1 },
              totalPrice: {
                $sum: {
                  $multiply: ['$orders.price', '$orders.quantity'],
                },
              },
            },
          },
        ]);
        return orders[0];
      },
    },
    methods: {
      userExists: async function (id: string) {
        const existingStudent = await this.model('User').findOne({ id });
        return existingStudent;
      },
    },
    toJSON: { virtuals: true },
    id: false,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

userSchema.pre('updateOne', async function (next) {
  const update: (AnyKeys<TUser> & AnyObject) | undefined = (this!.getUpdate() as UpdateQuery<TUser>)!.$set;

  if (update?.password) {
    update.password = await bcrypt.hash(update.password, Number(config.bcrypt_salt_rounds));
  }
  next();
});

userSchema.post('updateOne', async function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser, TUserModel>('User', userSchema);
