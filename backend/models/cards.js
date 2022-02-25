const mongoose = require('mongoose');
const { validateURLforScheme } = require('../utils/local_validators');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: /[\wа-яА-ЯЁёё-]+/,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: validateURLforScheme,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: Array,
    default: [],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('card', cardSchema);
