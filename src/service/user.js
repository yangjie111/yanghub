const connection = require('../app/database')

class UserService {
  async create(user){
    const {name,password} = user
    const statement = `INSERT INTO users(name,password) VALUES (?,?);`
    const result = await connection.execute(statement,[name,password])
    return result
  }

  async getUserByName(name){
    const statement = `SELECT * FROM users WHERE name = ?;`
    const result = await connection.execute(statement,[name])
    return result[0]
  }

  async updateAvatarUrlById(userId,avatarUrl){
    const statement = `UPDATE users SET user_avatar = ? WHERE id = ?;`;
    await connection.execute(statement,[avatarUrl,userId])
  }
}

module.exports = new UserService()