const connection = require('../app/database');
const sqlFragrant = 'SELECT m.id, m.content, m.createAt,\n' +
    'JSON_OBJECT("userId", u.id, "username", u.username, "avatarURL", u.avatarURL) AS `user`,\n' +
    //获取该动态的评论个数
    '(SELECT COUNT(*) FROM `comment` c WHERE c.moment_id = m.id) commentCount,\n' +
    //获取该动态的标签个数
    '(SELECT COUNT(*) FROM `moment_label` ml WHERE ml.moment_id = m.id) labelCount,\n' +
    //获取改动态图片链接
    '(SELECT JSON_ARRAYAGG(concat(\'http://localhost:8000/moment/images/\',files.filename)) FROM files WHERE moment_id = m.id) images\n'+
    'FROM moment m\n' +
    'LEFT JOIN users u ON m.user_id = u.id\n'

class MomentService {
    async create(userId, content) {
        const statement = 'INSERT INTO moment(content,user_id) VALUES (?,?);'
        const result = await connection.execute(statement, [content, userId])
        return result[0]

    }

    async getMomentById(id) {
        const statement = sqlFragrant +
            'WHERE m.id = ?;';
        const result = await connection.execute(statement, [id]);
        return result[0]
    }

    async getMomentList(offset, size) {
        const statement = sqlFragrant +
            'LIMIT ?,?;'
        const result = await connection.execute(statement, [offset, size]);
        return result[0]
    }
    async updateMoment(momentId,content){
        const statement = 'UPDATE moment SET content = ? WHERE id = ?;';
        const [result] = await connection.execute(statement,[content,momentId])
        return result

    }
    async deleteMoment(momentId){
        const statement = 'DELETE FROM moment WHERE id = ?;';
        const [result] = await connection.execute(statement,[momentId]);
        return result
    }
}

module.exports = new MomentService();