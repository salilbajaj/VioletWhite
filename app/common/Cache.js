var buffer = require("buffer");
var AsyncStorage = require("react-native").AsyncStorage;
var _ = require("lodash");
const authKey = "auth";
const userKey = "user";
class Cache {
  setUser(data, cb) {
    AsyncStorage.setItem(userKey, JSON.stringify(data), err => {
      if (err) {
        throw err;
      }
      return cb({ success: true });
    });
  }
  getUser(cb) {
    AsyncStorage.getItem(userKey, (err, val) => {
      if (err) {
        cb(err);
      }
      if (!val) {
        return cb();
      }
      return cb(JSON.parse(val));
    });
  }
  removeUser(cb) {
    AsyncStorage.removeItem(userKey, err => {
      return cb(true);
    });
  }
}

module.exports = new Cache();
