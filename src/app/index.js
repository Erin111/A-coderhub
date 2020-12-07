const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const {errorHandler} = require('./errorHandler')
const useRoutes = require('../router')
const app = new Koa();

//请求路径 - 中间件处理的映射

// app.useRoutes = useRoutes;

app.use(bodyParser());
// app.useRoutes();
//各个中间件的加载
useRoutes(app);

app.on('error', errorHandler);

module.exports = app;