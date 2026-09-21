const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");
const {
  createTokenForUser,
} = require("../services/authentication");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profileImage: {
      type: String,
      default: "/images/default.png",
    },
  },
  { timestamps: true },
);
userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) return;
  user.password = await bcrypt.hash(user.password, 12);
});

userSchema.static("matchPasswordAndCreateToken", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");
  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) throw new Error("Invalid password");
  const token = createTokenForUser(user);
  return token;
});

const User = model("User", userSchema);

module.exports = User;
