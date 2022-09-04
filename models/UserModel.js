import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    mobile: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    wishList: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WishList",
    },
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
  },
  {
    timestamps: true,
  }
)

UserSchema.methods.authenticate = async function (password) {
  return bcrypt.compareSync(password, this.password)
}

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashPassword = bcrypt.hashSync(this.password, 10)
    this.password = hashPassword
  }
  return next()
})

const User = mongoose.model("User", UserSchema)

export default User
