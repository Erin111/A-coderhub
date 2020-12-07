const jwt = require('jsonwebtoken');
const {PRIVATE_KEY} = require('../app/config');

//对用户的登陆请求进行操作
class AuthController {
    async login(ctx, next) {
        const {id, username} = ctx.user;
        const user = {id, username};
        const token = jwt.sign(user, PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: 24 * 60 * 60
        })
        ctx.body = {
            id,
            username,
            token
        };
    }


}

module.exports = new AuthController();