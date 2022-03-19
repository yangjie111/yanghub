const connection = require('../app/database')

class LabelService {
  async create(name){
    const statement = `INSERT INTO label (name) VALUES (?);`;
    const [result] = await connection.execute(statement,[name])
    return result
  }

  async getLabelByName(labelName){
    const statement = `SELECT * FROM label WHERE name = ?;`;
    const [result] = await connection.execute(statement,[labelName])
    return result
  }

  async list(limit,offset){
    const statement = `SELECT l.id id, l.name name FROM label l LIMIT ?, ?`
    const [result] = await connection.execute(statement,[offset,limit])
    return result
  }
}

module.exports = new LabelService()