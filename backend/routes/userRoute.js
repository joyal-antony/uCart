import express from "express";
import User from "../models/userModel";
import { getToken, isAuth } from "../util";
import bcrypt from 'bcryptjs'
const validateRegisterInput = require('../../Validation/Register')
const validateLoginInput = require('../../Validation/Login')

const router = express.Router();


router.put('/:id', isAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id,
      {
        $set: {
          name: req.body.name,
        }
      })
    if (user) {
      const updatedUser = await User.findById(user.id)
      res.send({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: getToken(updatedUser),
      });
    }
    else {
      res.status(404).send({ message: 'User Not Found' });
    }
  } catch (error) {
    res.status(500).send(error.message);

  }
});

router.post('/signin', async (req, res) => {
  try {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      res.send({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: getToken(user)
      })
    }
    else { res.status(401).send({ passwordincorrect: "Incorrect Password " }) }
  } catch (error) {
    res.status(501).send(error)
  }
})

router.post('/register', async (req, res) => {
  try {
    let { email, password, isAdmin, name } = req.body;
    const { errors, isValid } = validateRegisterInput(req.body)
    if (!isValid) { return res.status(400).json(errors) }
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ error: "Email already exists" })
    password = await bcrypt.hash(password, 12)
    user = new User({ email, password, isAdmin, name })
    await user.save()
    res.status(201).send({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: getToken(user)
    });
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "joyal",
      email: "joyalantony1@gmail.com",
      password: "1234",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});
export default router;
