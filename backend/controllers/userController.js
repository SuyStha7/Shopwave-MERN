import { encryptPassword, matchPassword } from "../helper/userHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if exists
    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    //checking user email already exist or not?
    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return res
        .status(400)
        .send({ success: false, message: "Email already exist" });
    }

    //  encrypting user password
    const hashedPassword = await encryptPassword(password);

    // creating new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).send({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(`registerController Error${error}`);
    return res
      .status(400)
      .send({ success: false, message: "Error in registerController", error });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if exists
    if (!email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    // check user email is present in db or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "Register your email" });
    }

    // matching password
    const isMatch = await matchPassword(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ success: false, message: "Enter vaild email/password" });
    }

    // generating token
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP,
    });

    // remove password field to send user data from backend to frontend
    user.password = undefined;

    // return success response
    return res
      .cookie("token", token, { httpOnly: true, secure: true })
      .status(200)
      .send({
        success: true,
        message: "You're logged in successfully",
        user,
        token,
      });
  } catch (error) {
    console.log(`loginController Error${error}`);
    return res
      .status(400)
      .send({ success: false, message: "Error in loginController", error });
  }
};

const logoutController = async (req, res) => {
  return res
    .cookie("token", "", { httpOnly: true, secure: true, expires: new Date(0) }) //to remove cookies from browser cookies
    .status(200)
    .send({ success: true, message: "You're logged out successfully" });
};

const allUsersController = async (req, res) => {
  try {
    // find all users in db
    const users = await userModel.find({}).select("-password");
    if (!users) {
      return res
        .status(404)
        .send({ success: false, message: "No users found" });
    }

    // return success response
    return res.status(200).send({ success: true, total: users.length, users });
  } catch (error) {
    console.log(`allUsersController Error${error}`);
    return res
      .status(404)
      .send({ success: false, message: "Error in allUsersController", error });
  }
};

export {
  registerController,
  loginController,
  logoutController,
  allUsersController,
};
