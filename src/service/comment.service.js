const connection = require('../app/database')

class CommentService {
    async create(content, momentId, userId) {
        const statement = 'INSERT INTO `comment` (content,moment_id,user_id) VALUES (?,?,?);'
        const [result] = await connection.execute(statement, [content, momentId, userId]);
        return result
    }

    async reply(content, momentId, commentId, userId) {
        const statement = 'INSERT INTO `comment` (content,moment_id,comment_id,user_id) VALUES (?,?,?,?);'
        const [result] = await connection.execute(statement, [content, momentId, commentId, userId]);
        return result
    }

    async update(content, commentId) {
        const statement = 'UPDATE `comment` SET content = ? WHERE id = ?;';
        const [result] = await connection.execute(statement, [content, commentId]);
        return result
    }
    async deleteComment(commentId){
        const statement = 'DELETE FROM `comment` WHERE id = ?; ';
        const [result] = await connection.execute(statement,[commentId]);
        return result
    }
    async getListByMomentId(momentId){
        const statement = 'SELECT c.id, c.content, c.comment_id commentId, c.createAt, c.updateAt, \n' +
            'JSON_OBJECT("userId",u.id,"name",u.username) author\n' +
            'FROM comment c\n' +
            'LEFT JOIN users u ON u.id = c.user_id\n' +
            'WHERE c.moment_id = ?;';
            const  [result] = await connection.execute(statement,[momentId]);
            return result
    }
}

module.exports = new CommentService();