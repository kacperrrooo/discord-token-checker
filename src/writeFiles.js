const fs = require('fs');

module.exports = (files = ['valid.txt', 'invalid.txt']) => {

    for (const file of files) fs.writeFileSync(`./${file}`, '');

}