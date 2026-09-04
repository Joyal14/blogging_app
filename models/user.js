const { createHmac } = require("crypto");
const { Schema, model } = require("mongoose");

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
    salt: {
      type: String,
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
userSchema.pre("save", function () {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = Math.random().toString(36);
  user.salt = salt;
  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  user.password = hashPassword;
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");
  const hashPassword = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");
  if (hashPassword !== user.password) throw new Error("Invalid password");
  return { ...user.toObject(), password: undefined, salt: undefined };
});

const User = model("User", userSchema);

module.exports = User;
