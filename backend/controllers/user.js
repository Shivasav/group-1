import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/user.js";

dotenv.config();

//user register controller
export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name, img } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(409, "Email is already in use"));
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hashedpassword,
      img,
    });
    const createduser = user.save();
    const token = jwt.sign({ id: createduser._id }, process.env.JWT, {
      expiresIn: "9999 years",
    });
    return res.status(200).json({ token, user });
  } catch (error) {
    return next(error);
  }
};

export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return next(createError(404, "user not found"));
    }

    const isPasswordCorrect = await bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      alert("Incorrect password");
      return next(createError(403, "Incorrect password"));
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT, {
      expiresIn: "9999 years",
    });
    return res.status(200).json({ token, user: existingUser });
  } catch (error) {
    return next(error);
  }
};
