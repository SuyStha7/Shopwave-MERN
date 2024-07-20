import { encryptPassword, matchPassword } from "../helper/userHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return res.status(400).send({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await encryptPassword(password);

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
    console.error(`registerController Error: ${error}`);
    return res.status(500).send({ success: false, message: "Error in registerController", error });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({ success: false, message: "Register your email" });
    }

    const isMatch = await matchPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ success: false, message: "Invalid email/password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP });

    user.password = undefined;

    return res.cookie("token", token, { httpOnly: true, secure: true }).status(200).send({
      success: true,
      message: "You're logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.error(`loginController Error: ${error}`);
    return res.status(500).send({ success: false, message: "Error in loginController", error });
  }
};

const logoutController = async (req, res) => {
  return res.cookie("token", "", { httpOnly: true, secure: true, expires: new Date(0) }).status(200).send({
    success: true,
    message: "You're logged out successfully",
  });
};

const allUsersController = async (req, res) => {
  try {
    const users = await userModel.find({}).select("-password");
    if (!users.length) {
      return res.status(404).send({ success: false, message: "No users found" });
    }

    return res.status(200).send({ success: true, total: users.length, users });
  } catch (error) {
    console.error(`allUsersController Error: ${error}`);
    return res.status(500).send({ success: false, message: "Error in allUsersController", error });
  }
};

const saveToCart = async (req, res) => {
  const { userId, cartItems } = req.body;
  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).send("User not found");

    user.cart = cartItems;

    await user.save();
    res.status(200).send({ success: true, message: "Saved cart items successfully" });
  } catch (error) {
    console.error(`saveToCart Error: ${error}`);
    res.status(500).send({ success: false, message: "Error saving cart items", error });
  }
};

const getFromCart = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).send({ success: false, message: "User ID is required" });
  }

  try {
    const user = await userModel.findById(userId).populate("cart.productId");
    if (!user) return res.status(404).send("User not found");

    res.status(200).send(user.cart);
  } catch (error) {
    console.error(`getFromCart Error: ${error}`);
    res.status(500).send({ success: false, message: "Error fetching cart items", error });
  }
};

export {
  registerController,
  loginController,
  logoutController,
  allUsersController,
  saveToCart,
  getFromCart,
};
