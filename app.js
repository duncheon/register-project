const userRouter = require('./Routes/user');
const middlewares = require('./middlewares/middlewares');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.use('/api/users', userRouter);

app.use(middlewares.unknownEndpoint);

module.exports = app;