const db = require('../database/dbConfig');
const tb = 'users';

exports.findByUsername = username => {
  return db(tb)
          .where({ username })
          .first();
};

exports.new = user => {
  return db(tb)
          .insert(user)
          .then(([ id ]) => id);
};