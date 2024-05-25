import { userModel } from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password)
      return res.status(400).json({ error: "incomplete input fields" });

    const userExist = await userModel.find({ email });
    if (userExist.length > 0)
      return res.status(400).json({ error: "user already exist" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      fullName,
      email,
      password: hashedPassword,
    });

    const createdUser = await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, "vaibhav", {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "User created successfully",
      token,
      user: createdUser,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Incomplete input fields" });

    const userExist = await userModel.findOne({ email });
    if (!userExist) return res.status(404).json({ error: "No user found" });

    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: userExist._id }, "vaibhav", {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ message: "user login successfully", token, user: userExist });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const checkUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const paramData = req.query.param;
    const data = jwt.verify(token, "vaibhav");
    if (data.userId !== paramData)
      return res.status(400).json({ error: "you are not autherised user" });
    return res.json({ message: "autherised" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
