const Error400 = require('../errors/error400');
const Error403 = require('../errors/error403');
const Error404 = require('../errors/error404');
const Card = require('../models/cards');

module.exports.getCards = (req, res, next) => {
  Card.find()
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  if (!req.body) {
    return next(new Error400('Неправильные параметры'));
  }
  const { name, link } = req.body;
  if (!name || !link || !owner) {
    return next(new Error400('Неправильные параметры'));
  }
  return Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new Error400('Неправильные параметры'));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const owner = req.user._id;
  return Card.findById(req.params.cardId)
    .populate('owner')
    .then((mycard) => {
      if (!mycard) {
        return next(new Error404('Карточка не найдена'));
      }
      if (!mycard.owner || mycard.owner._id.toString() !== owner) {
        return next(new Error403('Нет прав на удаление'));
      }
      return Card.findByIdAndRemove(req.params.cardId)
        .populate('owner')
        .then((card) => res.send(card))
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new Error400('Неправильные параметры'));
          }
          return next(err);
        });
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new Error404('Карточка не найдена'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new Error400('Неправильные параметры'));
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new Error404('Карточка не найдена'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new Error400('Неправильные параметры'));
      }
      return next(err);
    });
};
