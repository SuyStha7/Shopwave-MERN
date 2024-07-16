import bcrypt from "bcrypt";
import crypto from "crypto"

const encryptPassword = async (plainPassword) => {
  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return encryptedPassword;
};

const matchPassword = async (userPassword, hashedPassword) => {
  return bcrypt.compare(userPassword, hashedPassword)
};

const key1 = crypto.randomBytes(32).toString('hex')


export {encryptPassword, matchPassword}