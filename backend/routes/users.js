const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { validateURL } = require('../utils/local_validators');

const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/api/users', getUsers);

router.get('/api/users/me', getCurrentUser);

router.get('/api/users/:id', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUser);

router.patch('/api/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/api/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
}), updateUserAvatar);

module.exports = router;
