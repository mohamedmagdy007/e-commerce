const express = require("express");
const data = require("../data");
const User = require("../models/userModel");
const userRouter = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/Token");
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
          res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: token,
          });
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
userRouter.post('/register', async(req,res)=>{
  const user = new User({
    name:req.body.name,
     email:req.body.email,
     password:bcrypt.hashSync(req.body.password, 8) 
  })
  const createUser = await user.save()
  const token = await generateToken(createUser);
  res.send({ _id: createUser._id,
    name: createUser.name,
    email: createUser.email,
    isAdmin: createUser.isAdmin,
    token: token});
})
module.exports = userRouter;
