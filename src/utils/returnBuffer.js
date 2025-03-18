const fs = require('fs');
async function returnBuffer(image) {
    function isURL(img) {
        try {
            new URL(img);
            return true;
        } catch (error) {
            return false;
        }
    }
    try {
        if (Buffer.isBuffer(image)) {
            return image;
        } else if (isURL(image)) {
            const res = await fetch(image);
            const buffer = await res.arrayBuffer();
            return Buffer.from(buffer);
        } else if (/^data:image\/\w+;base64,/.test(image)) {
            const base64Data = image.split(',')[1];
            const buf = Buffer.from(base64Data, 'base64');
            return buf;
        } else if (typeof image === "string" && fs.existsSync(image)) {
            return fs.readFileSync(image);
        }
    } catch (error) {
        throw new Error(error);
    }

}

module.exports = returnBuffer;