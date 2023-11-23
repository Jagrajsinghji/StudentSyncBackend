const cloudinary = require('cloudinary').v2;

//here is cloudinary api credentials
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// module.exports.uploadImage = async (fileStream, fileName) => {
//     const result = await uploadStream(fileStream, fileName);
//     return result;
// }

module.exports.uploadImage = async (fileStream, fileName, foldername) => {         console.log("foldernamexx: "+foldername);
    const result = await uploadStream(fileStream, fileName, foldername);
    return result;
}

module.exports.getResized = (imageName) => {
    return cloudinary.url(imageName,
        {
            width: 540,
            height: 405,
            crop: 'fill',
            quality: 'auto'
        }
    );
}
const uploadStream = (fileStream, name, foldername) => {

    //wrapping into promise for using modern async/await
    return new Promise((resolve, reject) => {
        console.log("foldername: "+foldername);
        cloudinary.uploader.upload_stream({ public_id: name, folder : foldername }, (error, result) => {
            if (error) {
                console.log("error: "+error);
                reject(error);
            } else {
                console.log("reoslve: ");
                resolve(result);
            }
        }).end(fileStream)
    });
};

// const uploadStream = (fileStream, name) => {

//     //wrapping into promise for using modern async/await
//     return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload_stream({ public_id: name, folder : "profile" }, (error, result) => {
//             if (error) {
//                 console.log("error: "+error);
//                 reject(error);
//             } else {
//                 console.log("reoslve: ");
//                 resolve(result);
//             }
//         }).end(fileStream)
//     });
// };