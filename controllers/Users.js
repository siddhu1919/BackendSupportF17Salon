import { usersModel } from "../models/Users.js";
import sendCookie from "../utils/sendCookie.js";
import hashPassword from "../utils/hashPassword.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  let user = await usersModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "incorrect email or password",
    });
  }

  const hashedPass = hashPassword(password);
  if (user.password !== hashedPass) {
    return res.status(404).json({
      success: false,
      message: "incorrect email or password",
    });
  }
  sendCookie(true, user, res, `Welcome back`);
};

export const signup = async (req, res) => {
  const { email, password, dob } = req.body;
  let user = await usersModel.findOne({ email });
  if (user) {
    return res.status(404).json({
      success: false,
      message: "User already exists",
    });
  }
  const hashedPass = hashPassword(password);
  user = await usersModel.create({
    email,
    dob,
    password: hashedPass,
  });
  sendCookie(true, user, res, "User created", 201);
};

export const getUser = async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

export const logout = async (req, res) => {
  const { token } = req.cookies;
  
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: "none",
      secure: true,
    })
    .json({ success: true, message: "Logout successfull" });
};
