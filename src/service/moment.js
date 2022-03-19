const connection = require('../app/database')

class MomentService {
  async create(userId,content){
    const statement = `INSERT INTO moment(user_id,content) VALUES(?, ?);`
    const [result] = await connection.execute(statement,[userId,content])
    return result
  }

  async getMomentById(momentId){
    const statement = `
    SELECT
			m.id id,m.content content,m.createAt createTime,
      JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl',u.user_avatar) user,
     (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
			JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,
									'createTime',c.createAt,'user',JSON_OBJECT('id',cu.id,'name',cu.name,'avatarUrl',cu.user_avatar))
			),NULL) FROM comment c LEFT JOIN users cu ON c.user_id = cu.id WHERE c.moment_id = m.id) comments,
			IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name)),NULL) labels,
      (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename)) FROM file WHERE file.moment_id = m.id) images
    FROM moment m 
      LEFT JOIN users u ON m.user_id = u.id
			LEFT JOIN moment_label ml ON ml.moment_id = m.id
      LEFT JOIN label l ON ml.label_id = l.id 
      WHERE m.id = ?;
    `;
    const result = await connection.execute(statement,[momentId])
    return result
  }

  async getMomentList(offset,size){
    const statement = `
    SELECT
      m.id id,m.content content,m.createAt createTime, 
      JSON_OBJECT('id',u.id,'name',u.name) user,
			(SELECT COUNT(*) FROM comment c WHERE C.moment_id = m.id) commentCount,
      (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename)) FROM file WHERE file.moment_id = m.id) images
    FROM moment m
      LEFT JOIN users u ON m.user_id = u.id 
      LIMIT ?,?;	
    `;
    try {
      const result = await connection.execute(statement,[offset,size])
      console.log(result);
      return result[0]
    } catch (error) {
      console.log(error);
    }
  }

  async update(momentId,content){
    const statement = `UPDATE moment m SET content = ? WHERE m.id = ?;`
    try {
      const [result] = await connection.execute(statement,[content,momentId])
      return result
    } catch (error) {
      console.log(error);
    }
  }

  async remover(momentId){
    const statement = `DELETE FROM moment m WHERE m.id = ?;`
    try {
      const [result] = await connection.execute(statement,[momentId])
      return result
    } catch (error) {
      console.log(error);
    }
  }

  async hasLabel(momentId,labelId){
    const statement = `SELECT * FROM moment_label m WHERE m.moment_id = ? AND m.label_id = ?;`;
    const [result] = await connection.execute(statement,[momentId,labelId])
    return result[0] ? true : false;
  }

  async addLabel(momentId,labelId){
    const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES(?, ?);`;
    const [result] = await connection.execute(statement,[momentId,labelId])
    return result
  }
}

module.exports = new MomentService()