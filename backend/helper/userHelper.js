import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import userModel from "../models/userModel.js";

const encryptPassword = async (plainPassword) => {
  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return encryptedPassword;
};

const matchPassword = async (userPassword, hashedPassword) => {
  return bcrypt.compare(userPassword, hashedPassword);
};

const key1 = crypto.randomBytes(32).toString("hex");

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 7 * 24 * 60 * 60 * 1000; // Token expires in 7 days

    await user.save();

    // Send reset token to user via email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: "<noreply@example.com>",
      to: user.email,
      subject: "Password Reset Token",
      text: `Your password reset token is: ${resetToken}`,
      html: `<p>Your password reset token is: <strong>${resetToken}</strong></p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`Error sending email: ${error}`);
        return res.status(500).send({
          success: false,
          message: "Error sending password reset email",
          error,
        });
      }
      console.log(`Password reset email sent: ${info.response}`);
      return res.status(200).send({
        success: true,
        message: "Password reset token sent to your email",
        resetToken,
      });
    });
  } catch (error) {
    console.error(`forgetPasswordController Error: ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error in forgetPasswordController",
      error,
    });
  }
};

export { encryptPassword, matchPassword, forgetPassword };
