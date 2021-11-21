const express = require("express");
const data = require("../data");
const User = require("../models/userModel");
const userRouter = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { generateToken } = require("../helpers/Token");
const { isAuth } = require("../helpers/Token");
const Token = require("../models/ResetPasswordToken");
const sendEmail = require("../helpers/sendEmail");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "250957011123-idjuenirgj99td96d8fl8ttdgq9ejskt.apps.googleusercontent.com"
);
userRouter.post("/signin", async (req, res, next) => {
  const { body } = req;
  try {
    if (body.email && body.password) {
      const user = await User.findOne({ email: body.email });
      if (user) {
        const match = await bcrypt.compare(body.password, user.password);
        if (match) {
          const token = await generateToken(user);
          res.status(200).json({ token ,_id:user._id,  name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,});
        } else {
          return res.status(400).json({ message: "password invalid" });
        }
      } else {
        return res.status(404).json({ message: "user invalid" });
      }
    }
  } catch (error) {
    return next(new Error("server error"));
  }
});
userRouter.post("/register", async (req, res) => {
  try{
    existingUser = await User.findOne({ email:req.body.email });
    if(existingUser){
      return res.status(400).json({ message: "Email already exists" });
    }else{
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, saltRounds),
      });
      const createdUser = await user.save();
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
      });
    }
  }catch(err){
    return res.status(400).json(err);
  }
  
});

userRouter.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

userRouter.put("/profile",isAuth ,async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name =req.body.name || user.name
    user.email =req.body.email || user.email
    if(req.body.password){
      user.password = bcrypt.hashSync(req.body.password, saltRounds)
    }
    const updateuser = await user.save()
    res.send({
      _id: updateuser._id,
      name: updateuser.name,
      email: updateuser.email,
      isAdmin: updateuser.isAdmin,
      token: generateToken(updateuser),
    });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});
userRouter.post("/resetPassword/:userId/:token", async (req, res) => {
  try {
      const user = await User.findById(req.params.userId);
      if (!user) return res.status(400).send("invalid link or expired");

      const token = await Token.findOne({
          userId: user._id,
          token: req.params.token,
      });
      if (!token) return res.status(400).send("Invalid link or expired");
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
      user.password = req.body.password;
      await user.save();
      await token.delete();
      res.status(200).send("password reset sucessfully.");
  } catch (error) {
      res.status(500).send("An error occured");
      console.log(error);
  }
});
userRouter.post("/resetPassword",async (req, res) => {
  try{
   const user = await User.findOne({ email:req.body.email });
    if(!user){
      return res.status(400).send({message:"user with given email doesn't exist"})
    }
    let token = await Token.findOne({ userId: user._id });
    if(!token){
      const myToken = await generateToken(user._id);
      token = await new Token({
        userId: user._id,
        token: myToken,
    }).save();
  }
    const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.email, link);
    res.status(200).send({message:"password reset link sent to your email account"});
}
  catch(err){
    res.status(500).send("An error occured");
    console.log(err)
  }
});
module.exports = userRouter;
