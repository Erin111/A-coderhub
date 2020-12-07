const connection = require('../app/database');

class Moment_labelService {
    async add(momentId, labelId) {
        const statement = 'INSERT INTO moment_label (moment_id,label_id) VALUES (?,?);'
        const [result] = await connection.execute(statement, [momentId, labelId]);
        return result
    }

    async getRelationByLabelId(labelId, momentId) {
        const statement = 'SELECT * FROM moment_label WHERE label_id = ? AND moment_id = ?;'
        const [result] = await connection.execute(statement, [labelId, momentId])
        return result
    }
}

module.exports = new Moment_labelService();