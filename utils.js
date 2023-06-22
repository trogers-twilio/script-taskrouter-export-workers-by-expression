const fs = require('fs');

exports.initializeDirectory = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory)
  }
};
