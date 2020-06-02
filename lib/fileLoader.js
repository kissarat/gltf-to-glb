// Native
const fs = require('fs');

const fileLoader = filename => new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

module.exports = fileLoader;
