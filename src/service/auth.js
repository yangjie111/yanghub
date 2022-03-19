const connection = require('../app/database')

class AuthService {
  async checkResource(tableName,momentId,userId){
    const statement = `SELECT * FROM ${tableName} m WHERE m.id = ? AND m.user_id = ?;`
    try {
      const result = await connection.execute(statement,[momentId,userId])
      return result[0].length ? true : false
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AuthService()