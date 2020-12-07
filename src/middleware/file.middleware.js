const Multer = require('koa-multer');
const path = require('path');
const Jimp = require('jimp')

const {AVATAR_PATH, PICTURE_PATH} = require('../constants/filePath')
const storage = Multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, AVATAR_PATH);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const avatarUpload = new Multer({
    // dest: AVATAR_PATH
    storage
})
const saveAvatar = avatarUpload.single('avatar');

const pictureUpload = new Multer({
    dest: PICTURE_PATH
})
//最多上传九个图片
const savePictures = pictureUpload.array('picture', 9);
//将图片保存成多种尺寸以便前端可以在多场景下进行使用
const pictureResize = async (ctx, next) => {
    const files = ctx.req.files;
    for (let file of files) {
        let destPath = path.join(file.destination, file.filename);
        Jimp.read(file.path).then((image) => {
            image.resize(1280, Jimp.AUTO).write(`${destPath}-large`);
            image.resize(640, Jimp.AUTO).write(`${destPath}-middle`);
            image.resize(320, Jimp.AUTO).write(`${destPath}-small`);
        })
    }
    await next();
}

module.exports = {saveAvatar, savePictures, pictureResize}



