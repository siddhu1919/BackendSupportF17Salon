import jwt from "jsonwebtoken";

//Send Cookies
const sendCookie = (remember = false, user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  let timeout = 15;
  if (remember) {
    timeout = 60;
  }
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: timeout * 60 * 1000,
      sameSite: "none",
      secure: true,
    })
    .json({
      success: true,
      message,
      user,
    });
};

export default sendCookie;
