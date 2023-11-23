const receiveImage = require('../middlewares/multerMiddleware');
const { uploadImage } = require('../utils/cloudinaryUtil');

exports.uploadProfile =  async(req, res) => {
    try{

        receiveImage(req, res, async (err) => {
            //handling errors from multer
            if (err) {
                return res.json({ error: err.message });
            }
    
            try {
                const imageStream = req.file.buffer;
                const imageName = new Date().getTime().toString();
    
                const uploadResult = await uploadImage(imageStream, imageName,"profile");
                const uploadedUrl = uploadResult.url;

                //creating url for resized image
                //const urlMin = getResized(imageName);
    
                return res.json({ url: uploadedUrl});

            } catch (error) {
                return res.json({ error: 'Failed to upload' });
            }
        })
    }catch(error){
        return res.status(500).send(error);
    }
}

exports.uploadStudentid =  async(req, res) => {
    try{
        receiveImage(req, res, async (err) => {
            //handling errors from multer 
            if (err) {
                return res.status(500).send({ error: err.message });
            }
            try {
                const imageStream = req.file.buffer;
                const imageName = new Date().getTime().toString();

                const uploadResult = await uploadImage(imageStream, imageName,"studentid");
                const uploadedUrl = uploadResult.url;

                //creating url for resized image
                //const urlMin = getResized(imageName);
    
                return res.json({ url: uploadedUrl});

            } catch (error) {
                return res.status(500).send({ error: 'Failed to upload. ' + error.message });
            }
        })
    }catch(error){
        return res.status(500).send(error);
    }
}