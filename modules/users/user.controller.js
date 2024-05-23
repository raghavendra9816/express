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
const create = async (payload) => {
  const { email, password } = payload;
  const duplicateEmail = await usermodel.findOne({ email });
  //if (!duplicateEmail) throw new Error("Email is already in use");
  payload.password = generateHash(password);
  const result = await usermodel.create(payload);
  // call the node mailer
  eventEmitter.emit("signup", email);
  return result;
};

const login = async (payload) => {
  const { email, password } = payload;
  //check for email
  const user = await usermodel
    .findOne({ email, isActive: true })
    .select("+password");
  if (!user) throw new Error("user not found");
  const isVerified = user?.isEmailVerified;
  if (!isVerified) throw new Error("Email verification required");
  const isValidpw = compareHash(user?.password, password);
  if (!isValidpw) throw new Error("Email or password is invalid");
  const tokenPayload = { name: user?.name, email: user?.email };
  const token = generateToken(tokenPayload);
  console.log({ token });
  if (!token) throw new Error("something went wrong");
  return token;
};

const getbyId = (id) => {
  return usermodel.findOne({ _id: id });
};
//list users
const list = () => {
  return usermodel.find();
};
const updateById = (id, payload) => {
  return usermodel.findOneAndUpdate({ _id: id }, payload, { new: true });
};
const removeById = (id) => {
  return usermodel.deleteOne({ _id: id });
};
const generateEmailToken = async (payload) => {
  const { email } = payload;
  const user = await usermodel.findOne({ email, isActive: true });
  if (!user) throw new Error("user not found");
  const isVerified = user?.isEmailVerified;
  if (!isVerified) {
    const otp = generateOtp();
    const updateduser = await usermodel.updateOne({ _id: user?._id }, { otp });
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
const blockuser = async (payload) => {
  const user = await usermodel.findOne({ _id: payload });
  if (!user) throw new Error("user not found");
  const statusPayload = { isActive: !user?.isActive };
  const updateduser = await usermodel.updateOne(
    { _id: payload },
    statusPayload
  );
  if (!updateduser) throw new Error("something went wrong");
  return true;
};
const getProfile = (_id) => {
  return usermodel.findOne(_id);
};
const changePassword = async (id, payload) => {
  const { newPassword, oldPassword } = payload;
  //get old password from user
  const user = await usermodel
    .findOne({
      _id: id,
      isEmailVerified: true,
      isActive: true,
    })
    .select("+password");

  if (!user) throw new Error("user  not find");
  //compare that password to user databasse
  const isValidpw = compareHash(user?.password, oldPassword);
  if (!isValidpw) throw new Error("password didnt match");
  //convert new password to hash password
  const data = { password: generateHash(newPassword) };
  //store that hash password
  return usermodel.updateOne({ _id: id }, data);
};
const resetPassword = async (id, newPassword) => {
  //user exist or not
  const user = await usermodel.findOne({ _id: id });
  if (!user) throw new Error("user not found");
  //new password hash
  const hashPw = generateHash(newPassword);
  //update user
  return usermodel.updateOne({ _id: id }, { password: hashPw });
};
const forgotPasswordTokenGen = async (payload) => {
  const { email } = payload;
  //find the user
  const user = await usermodel.findOne({
    email,
    isActive: true,
    isEmailVerified: true,
  });

  if (!user) throw new Error("user not found");
  //generate tioken
  const otp = generateOtp();
  //store token in database
  const updateduser = await usermodel.updateOne({ email }, { otp });
  if (!updateduser) throw new Error("something went wrong");
  //send the token in the email
  eventEmitter.emit("updated", email, otp);
  return true;
};
const forgotPasswordChange = async (payload) => {
  const { email, otp, newPassword } = payload;

  // Find the user
  const user = await usermodel.findOne({
    email,
    isActive: true,
    isEmailVerified: true,
  });
  if (!user) throw new Error("user not found");

  // Check if the OTP matches
  if (otp !== user?.otp) throw new Error("otp mismatch");

  // Generate hash for the new password
  const hashPw = generateHash(newPassword);

  // Update the user's password and clear the OTP
  const updateduser = await usermodel.updateOne(
    { email },
    { password: hashPw, otp: "" }
  );
  if (!updateduser) throw new Error("something went wrong");
};

module.exports = {
  forgotPasswordChange,
  forgotPasswordTokenGen,
  resetPassword,
  changePassword,
  getProfile,
  blockuser,
  verifyEmailToken,
  login,
  create,
  getbyId,
  list,
  updateById,
  removeById,
  generateEmailToken,
};
