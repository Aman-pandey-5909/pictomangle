const fs = require('fs');
async function returnBuffer(image) {
    function isURL(img) {
        try {
            const url = new URL(img);
            // console.log('true', new URL(img));
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (error) {
            // console.log('false');
            return false;
        }
    }
    try {
        if (Buffer.isBuffer(image)) {
            // console.log('bug in if section');
            return image;
        } else if (/^data:image\/\w+;base64,/.test(image)) {
            // console.log('bug in 2nd elseif');
            const base64Data = image.split(',')[1];
            const buf = Buffer.from(base64Data, 'base64');
            return buf;
        } else if (typeof image === "string" && fs.existsSync(image)) {
            // console.log('bug in 3rd elseif');
            return fs.readFileSync(image);
        } else if (isURL(image)) {
            // console.log('bug in 1st elseif');
            const res = await fetch(image);
            const buffer = await res.arrayBuffer();
            // console.log(Buffer.from(buffer));
            return Buffer.from(buffer);
        }
    } catch (error) {
        throw new Error(error);
    }

}

module.exports = returnBuffer;