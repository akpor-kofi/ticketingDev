import mongoose from "mongoose";
import { Password } from "../services/password";

// interface that describes the properties required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

//interface to describe that describes the properties that user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//interface that describes the properties of a single user
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);
userSchema.statics.build = async (attr: UserAttrs) => {
  try {
    const newUser = await User.create(attr);
    return newUser;
  } catch (err) {
    throw err;
  }
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.password);
    this.password = hashed;
  }
  next();
});

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
