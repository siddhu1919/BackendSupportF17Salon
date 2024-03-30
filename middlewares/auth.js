import { usersModel } from "./../models/Users.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Log in first",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const id = decoded._id;
  const user = await usersModel.findOne({ _id: id });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid user",
    });
  }
  req.user= user;
  next();
};