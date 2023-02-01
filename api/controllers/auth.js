import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const users = await User.distinct("username")
    const emails = await User.distinct("email")
    const phoneNumbers = await User.distinct("phoneNumber")

    if(users.includes(req.body.username)){
      res.status(418).send("Username in use")
      return
    }

    if(emails.includes(req.body.email)){
      res.status(418).send("E-mail in use")
      return
    }

    if(phoneNumbers.includes(req.body.phoneNumber)){
      res.status(418).send("Phone number in use")
      return
    }

    const regexEMAIL = new RegExp(/.+@.+\..+/)
    if(!regexEMAIL.test(req.body.email)){
      res.status(418).send("Invalid E-mail")
      return
    }

    const regexNUMBER = new RegExp(/06(.){8}/)
    if(!regexNUMBER.test(req.body.phoneNumber)){
      res.status(418).send("Invalid number")
      return
    }

    const newUser = new User({
      ...req.body,
      password: hash,
    });


    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) return next(createError(400, "Wrong password!"));
    if (!user.isActive && !user.isStaff && !user.isAdmin)
      return next(createError(400, "User not allowed!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
