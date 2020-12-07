
const connections = require('../app/database')

class UserService {
    async create(user) {
        //    将user存储到数据库中
        console.log('用户数据保存到数据库中', user);
        const {username, password} = user;
        //密码需要进行加密再存到数据库中
        const statement = 'INSERT INTO users (username,`password`) VALUES (?,?);'

        const result = await connections.execute(statement,[username,password]);

        return result[0];
    }
    async getUserName(username){
        const statement = 'SELECT * FROM users WHERE username = ?;'
        const result = await connections.execute(statement,[username]);
        return result[0]
    }
    async addAvatarURL(avatarURL,userId){
        const  statement ='UPDATE users SET avatarURL = ? WHERE id = ?;';
        const [result] = await connections.execute(statement,[avatarURL,userId]);
        return result
    }
}

module.exports = new UserService();