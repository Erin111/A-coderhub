const fs = require('fs');
//统一对所有路由进行注册
const useRoutes = (app) => {
    //读取当前文件夹里所有文件
    fs.readdirSync(__dirname).forEach(file => {
        if (file === 'index.js') return;
        const router = require(`./${file}`);
        app.use(router.routes());
        app.use(router.allowedMethods());
    })

}
module.exports = useRoutes;