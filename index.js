//Made by Aman Pandey - https://github.com/Aman-pandey-5909
const mime = require('mime-types')
const sharp = require('sharp')
const fs = require('fs');

async function pictomangle({ image, toFormat = 'webp' }) {

    if (!image) throw new Error('image is required');

    let imageBuffer;
    if (Buffer.isBuffer(image)) {
        imageBuffer = image;
    } else if (typeof image === 'string') {
        if (!fs.existsSync(image)) throw new Error('image does not exist');
        imageBuffer = fs.readFileSync(image);
    } else {
        throw new Error('image is not supported');
    }
    const memeType = mime.lookup(image)
    if (!memeType) throw new Error('image is not supported');
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
    if (!validTypes.includes(memeType)) throw new Error('image is not supported, please use one of the following types : image/jpeg, image/png, image/webp, image/jpg');
    try {
        return await sharp(imageBuffer).toFormat(toFormat).toBuffer();
    } catch (error) {
        throw new Error('Error: Image Processing Failed');
    }

}

function pictomangleMW({ storageType = 'memory', maxSize = 10 }) {

    let multer
    try {
        multer = require('multer');
    } catch (error) {
        throw new Error('Multer is required for pictomangleMW. Please install it using: npm install multer');
    }

    if (storageType !== 'memory' && storageType !== 'disk') throw new Error('storageType must be memory or disk');
    const storage = storageType === 'memory' ? multer.memoryStorage() : multer.diskStorage()
    return multer({
        storage: storage,
        limits: {
            fileSize: maxSize * 1024 * 1024,
        }
    })


}

exports.pictomangle = pictomangle
exports.pictomangleMW = pictomangleMW