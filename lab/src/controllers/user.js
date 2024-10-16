const db = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    if (!user.username)
      return callback(new Error("Wrong user parameters"), null)

    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }

    db.hgetall(user.username, (err, res) => {
      if (err) return callback(err, null)

      if (!res) {
        db.hmset(user.username, userObj, (err, res) => {
          if (err) return callback(err, null)
          callback(null, res) 
        })
      }
      else {
        return callback(new Error(), null)
      }
    })
  },

  get: (user, callback) => {
    return callback(new Error(), null)
  }

}


