const express = require("express");
const data = require("../data");
const User = require("../models/userModel");
const userRouter = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { generateToken } = require("../helpers/Token");
const { isAuth } = require("../helpers/Token");
userRouter.get(
  `/seed`,
  asyncHandler(async (req, res) => {
    await User.remove({});
    const createUsers = await User.insertMany(data.user);
    res.send({ createUsers });
  })
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
module.exports = userRouter;
