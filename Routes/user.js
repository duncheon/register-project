const userRouter = require('express').Router();
const data = require('../utils/data');
const bcrypt = require('bcrypt');
const saltRound = 10;

userRouter.get('/', (req, res) => {
  return res.json(data.user);
});

userRouter.post('/', async (req, res) => {
  const body = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  const newUser = {
    username: body.username,
    fullname: body.fullname,
    password: hashedPassword,
  };

  const userExisted = data.user.find(
    (user) => user.username === newUser.username
  );

  if (userExisted) {
    return res.status(400).send({ error: 'this username is already existed' });
  }

  data.user = [...data.user, { ...newUser }];
  //delete newUser.password;
  return res.json(body);
});

module.exports = userRouter;
