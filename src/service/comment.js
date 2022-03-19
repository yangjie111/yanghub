const connection = require('../app/database')

class CommentService {
  async create(content,momentId,userId){
    const statement = `INSERT INTO comment(content,moment_id,user_id) VALUES(?, ?, ?);`
    const [result] = await connection.execute(statement,[content,momentId,userId])
    return result
  }

  async reply(content,momentId,commentId,userId){
    const statement = `INSERT INTO comment(content,moment_id,comment_id,user_id) VALUES(?, ?, ?, ?);`
    const [result] = await connection.execute(statement,[content,momentId,commentId,userId])
    return result
  }

  async update(content,commentId){
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`
    const result = await connection.execute(statement,[content,commentId])
    return result[0]
  }

  async remover(commentId){
    const statement = `DELETE FROM comment WHERE id = ?;`
    const result = await connection.execute(statement,[commentId])
    return result[0]
  }
}

module.exports = new CommentService()