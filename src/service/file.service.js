const connection = require('../app/database')
class fileService{
    async create(filename, mimetype, size, userId) {
        const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?)`;
        const [result] = await connection.execute(statement, [filename, mimetype, size, userId]);
        return result;
    }

    async getAvatarByUserId(userId) {
        const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
        const [result] = await connection.execute(statement, [userId]);
        return result.pop();
    }

    async createFile(filename, size, mimetype, userId, momentId) {
        const statement = `INSERT INTO files (filename, mimetype, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await connection.execute(statement, [filename, mimetype, size, userId, momentId]);
        return result;
    }
    async getFileByFileName(filename){
        const statement = 'SELECT * FROM files WHERE filename = ?';
        const  result = await connection.execute(statement,[filename]);
        return result[0]
    }
}
module.exports = new fileService();