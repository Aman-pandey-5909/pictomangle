const { pictomangle } = require('../..');
const returnBuffer = require('../utils/returnBuffer')
const sharp = require('sharp');

async function pictomangle(image, toFile = 'webp', options={resize:{width,height}, outputQuality}) {
    try {
        const buf = await returnBuffer(image);
        let finalOpQual;
        if (outputQuality > 1) {
            finalOpQual =  100;
        } else if (outputQuality < 0) {
            finalOpQual = 0;
        } else {
            finalOpQual = options.outputQuality*100;
        }
        return await sharp(buf)
            .toFormat(toFile, {quality: finalOpQual})
            .toBuffer();
    } catch (error) {
        console.error("Encountered an error");
    }
}


module.exports = pictomangle;