const returnBuffer = require('../utils/returnBuffer')
const sharp = require('sharp');

/**
 * Processes an image and converts it to a specified format with optional resizing and quality adjustment.
 * 
 * @param {Buffer|string} image - The image to process. Can be a Buffer, a file path, or a URL.
 * @param {Object} [options={}] - Optional settings for processing.
 * @param {Object} [options.resize={}] - Resize options.
 * @param {number} [options.resize.width] - The desired width of the output image.
 * @param {number} [options.resize.height] - The desired height of the output image.
 * @param {number} [options.outputQuality] - Quality of the output image (0 to 1). Default is 100%.
 * @param {string} [options.toFile='webp'] - Output file format (e.g., 'webp', 'jpeg', 'png').
 * @returns {Promise<Buffer>} - A promise resolving to the processed image buffer.
 */
async function pictomangle(image, options = {}) {
    try {
        // console.log('now running pictomanle index.js, bug here??');
        const { resize = {}, outputQuality, toFile = 'webp' } = options;
        const { width, height } = resize;
        const buf = await returnBuffer(image);
        // console.log(buf);
        let finalOpQual;
        if (outputQuality > 1 || outputQuality === undefined) {
            // console.log('opQual is > 1 or undefined');
            finalOpQual = 100;
        } else if (outputQuality < 0) {
            // console.log('opQual is < 0');
            finalOpQual = 0;
        } else {
            // console.log('opQual is between 0 and 1');
            finalOpQual = outputQuality * 100;
        }

        // console.log('now running sharp wtf bugs soo many bugs');
        return await sharp(buf)
            .toFormat(toFile, { quality: finalOpQual })
            .toBuffer();
    } catch (error) {
        console.error("Encountered an error", error);
    }
}


module.exports = pictomangle;