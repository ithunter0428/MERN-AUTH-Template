import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';
import generateToken from '../utils/generateToken.js';

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;

  const userExists = await User.findOne({$or:[{ email: email }, {userName: userName}]});

  if (userExists) {
    // userExists.firstName = firstName || userExists.firstName;
    // userExists.lastName = lastName || userExists.lastName;
    // userExists.userName = userName || userExists.userName || userName;
    // userExists.email = email || userExists.email || email;
    // userExists.password = password || userExists.password;

    const user = await userExists.save();

    if (user) {
      res.status(401).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } else {
    const user = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({$or:[{ email: email }, {userName: email}]});
  
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email/username or password');
  }
});

export { loginUser, registerUser };
