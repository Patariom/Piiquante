//Requires
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png'
}

//Allow users to upload file that will be saved on the server in /images folder
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        var name = file.originalname.split('.')[0]
        name = name.split(' ').join('_')
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + '_' + Date.now() + '.' + extension);
    }
});


module.exports = multer({storage: storage}).single('image');