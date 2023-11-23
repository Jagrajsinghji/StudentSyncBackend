const multer = require('multer');

const storage = multer.memoryStorage()

module.exports = multer(
    {
        storage: storage,
        //limit the file size  5Mb
        limits: { fileSize: 5 * 1024 * 1024 },
        //accept only jpg jpeg png files
        fileFilter: function (req, file, cb) {
            const fileRegex = new RegExp('\.(jpg|jpeg|png)$');
            const fileName = file.originalname;

            if (!fileName.match(fileRegex)) {
                return cb(new Error('Invalid file type'));
            }

            cb(null, true);
        }
    })
    .single('image'); //single for accepting only one file from 'image' form-data key