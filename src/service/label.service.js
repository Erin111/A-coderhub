const connection = require('../app/database')

class LabelService {
    async create(content) {

        const statement = 'INSERT INTO label (name) VALUES (?);'
        const [result] = await connection.execute(statement, [content])
        return result
    }

    async getLabelByName(name) {
        const statement = 'SELECT * FROM label WHERE label.name = ?;'
        const [result] = await connection.execute(statement, [name]);
        return result
    }

    async getLabelList(offset, size) {
        const statement = 'SELECT * FROM label l LIMIT ?,?;'
        const [result] = await connection.execute(statement, [offset, size]);
        return result
    }

    async getLabelByMomentId(momentId) {
        const statement = 'SELECT l.id labelId,l.`name` labelName FROM moment m\n' +
            'LEFT JOIN moment_label ml ON m.id = ml.moment_id\n' +
            'LEFT JOIN label l ON ml.label_id = l.id\n' +
            'WHERE m.id = 7;';
        const [result] = await connection.execute(statement, [momentId]);
        return result
    }
}

module.exports = new LabelService();