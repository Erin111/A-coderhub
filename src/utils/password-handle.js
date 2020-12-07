const crypto = require('crypto');
const md5password = (password)=>{
   const md5 =  crypto.createHash('md5');
    //加密密码并用digest转成16进制字符串
    const result = md5.update(password).digest('hex');
    return result
}
module.exports = {
    md5password
}