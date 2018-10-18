// Native
const fs = require('fs');

const fileLoader = filename => new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      }

      resolve(data);
    });
  });

module.exports = fileLoader;
