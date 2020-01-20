let client = null;

// add
async function add(itemId, userId) {
  return new Promise((resolve, reject) => {
    client.hget(`basket: ${userId}`, itemId, (err, obj) => {
      if (err) return reject(err);
      if (!obj) {
        return client.hset(`basket: ${userId}`, itemId, 1, (seterr, res) => {
          if (seterr) return reject(seterr);
          return resolve(res);
        });
      }
      return client.hincrby(`basket: ${userId}`, itemId, 1, (incerr, res) => {
        if (incerr) return reject(incerr);
        return resolve(res);
      });
    });
  });
}

// getAll
async function getAll(userId) {
  return new Promise((resolve, reject) => {
    client.hgetall(`basket: ${userId}`, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
}

// remove
async function remove(itemId, userId) {
  return new Promise((resolve, reject) => {
    client.hdel(`basket: ${userId}`, itemId, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
}

module.exports = (_client) => {
  if (!_client) throw new Error('Missing redis client object');

  client = _client;

  return {
    add,
    getAll,
    remove,
  };
};