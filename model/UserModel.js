import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    require: true,
  },
  lastName: {
    type: String,
    trim: true,
    require: true,
  },
  email: {
    type: String,
    trim: true,
    require: true,
  },
  mobile: {
    type: String,
    trim: true,
    require: true,
  },
  isAdmin: {
    type: String,
    trim: true,
  },
  addresses: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  timestamps: true,
});

UserSchema.methods.authenticate = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashPassword = await bcrypt.hashSync(this.password, 10);
    this.password = hashPassword;
  }
  return next();
});

export default mongoose.model("User", UserSchema);
