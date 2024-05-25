import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
    .then(() => {
      console.log("database is connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
