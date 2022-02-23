const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const Error404 = require('./errors/error404');
const Error400 = require('./errors/error404');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb')
  .catch((err) => {
    console.log({ message: `Ошибка подключения к базе данных: ${err} ` });
    throw Error(`Ошибка подключения к базе данных: ${err} `);
  });

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/[a-z\d\-._~:/?#[\]@!$&'()*+,;=]+#?&/),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.use(authMiddleware);
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('*', (req, res, next) => next(
  new Error404('Ресурс не найден. Проверьте URL и метод запроса'),
));

// Celebrate errors
app.use((req, res, next) => {
  try {
    errors();
  } catch (err) {
    if (err.message === 'Validation failed') {
      return next(new Error400('Неправильные параметры'));
    }
    return next(err);
  }
  return next();
});

// здесь обрабатываем все ошибки
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  // console.log(statusCode);
  // console.log(message);
  // console.log(name);
  res.status(statusCode).send(
    { message: statusCode === 500 ? 'На сервере произошла ошибка' : message },
  );
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
