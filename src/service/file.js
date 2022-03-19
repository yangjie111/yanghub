const { sign } = require('jsonwebtoken');
const connection = require('../app/database')

class FileService {
  async createAvatar(fileName,mimeType,fileSize,userId){
    const statement = `INSERT INTO avatar(filename,mimetype,size,user_id) VALUES (?, ?, ?, ?);`;
    const [result] = await connection.execute(statement,[fileName,mimeType,fileSize,userId])
    return result
  }

  async getAvatarByUserId(userId){
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
    const [result] = await connection.execute(statement,[userId])
    return result[0]
  }

  async createFile(fileName,mimeType,fileSize,userId,momentId){
    const statement = `INSERT INTO file(filename,mimetype,size,user_id,moment_id) VALUES (?, ?, ?, ?, ?);`;
    const [result] = await connection.execute(statement,[fileName,mimeType,fileSize,userId,momentId])
    return result
  }

  async getFileByFileName(filename){
    const statement = `SELECT * FROM file WHERE filename = ?;`;
    const [result] = await connection.execute(statement,[filename])
    return result[0]
  }
}

module.exports = new FileService()