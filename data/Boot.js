// OpenDatabase Connection and running the server sequentially

import mongoose from "mongoose";
import { app } from "../app.js";

const Boot = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("F17Salon DB Online");
      app.listen(process.env.PORT, () => {
        console.log(`App Running On PORT ${process.env.PORT}`);
      });
    })
    .catch((e) => {
      console.log("Error", e);
    });
};

export default Boot;