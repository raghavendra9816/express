const { model } = require("mongoose");
const event = require("events");
const usermodel = require("./user.model");
const { generateHash, compareHash } = require("../../utils/hash");
const { sendMail } = require("../../services/mailer");
const { generateToken, generateOtp } = require("../../utils/token");

const eventEmitter = new event.EventEmitter();
eventEmitter.addListener("signup", (email) =>
  sendMail({
    email,
    subject: "MOvie MAte is working",
    htmlmsg: "<b> Thank you for joining Movie Mate</b>",
  })
);
//emailverification
eventEmitter.addListener("emailverification", (email, otp) =>
  sendMail({
    email,
    subject: "Email verificatin",
    htmlmsg: `<b>${otp}</b>This is your otp number</b>`,
  })
);

const login = async (payload) => {
  const { email, password } = payload;
  //check for email
  const user = await usermodel.findOne({ email, isActive: true });
  if (!user) throw new Error("user not found");
  const isVerified = user?.isEmailVerified;
  if (!isVerified) throw new Error("Email verification required");
  const isValidpw = compareHash(user?.password, password);
  if (!isValidpw) throw new Error("Email or password is invalid");
  const tokenPayload = { name: user?.name, roles: user?.roles };
  const token = generateToken(tokenPayload);
  if (!token) throw new Error("something went wrong");
  return token;
};
const create = async (payload) => {
  const { email, password } = payload;
  const duplicateEmail = await usermodel.findOne({ email });
  if (!duplicateEmail) throw new Error("Email is already in use");
  payload.password = generateHash(password);
  const result = await usermodel.create(payload);
  // call the node mailer
  eventEmitter.emit("signup", email);
  return result;
};
const getbyId = (id) => {
  return usermodel.findOne({ _id: id });
};
const list = () => {
  return usermodel.find();
};
const updateById = (id, payload) => {
  return usermodel.updateOne({ _id: id }, payload);
};
const removeById = (id) => {
  return usermodel.deleteOne({ _id: id });
};
const generateEmailToken = (payload) => {
  const { email } = payload;
  const user = usermodel.findOne({ email, isActive: true });
  if (!user) throw new Error("user not found");
  const isVerified = user?.isEmailVerified;
  if (!isVerified) {
    const otp = generateOtp();
    const updateduser = usermodel.updateOne({ _id: user?._id }, { otp });
    if (!updateduser) throw new Error("something went wrong");
    console.log({ otp });
    eventEmitter.emit("emailverification", email, otp);
  }
  return true;
};

const verifyEmailToken = async (payload) => {
  const { email, token } = payload;
  const user = await usermodel.findOne({ email, isActive: true });
  if (!user) throw new Error("user not found");
  const isTokenValid = user?.otp === token;
  if (!isTokenValid) throw new Error("Token is missing");
  const result = await usermodel.updateOne(
    { _id: user?._id },
    { isEmailVerified: true, otp: "" }
  );
  if (!result) throw new Error("something went wrong");
  return isTokenValid;
};

module.exports = {
  verifyEmailToken,
  login,
  create,
  getbyId,
  list,
  updateById,
  removeById,
  generateEmailToken,
};
