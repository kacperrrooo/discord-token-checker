const fs = require('fs');

module.exports = (file = 'tokens.txt') => {

    if (!fs.existsSync(file)) throw new Error('tokens.txt not found');

    const fileData = fs.readFileSync(`./${file}`, { encoding: 'utf-8' });

    if (!fileData.length) throw new Error('tokens not found');

    const splited = fileData.split('\n');

    return splited;

}