const fs = require('fs');

const config = require('./config');
const { initializeDirectory } = require('./utils');

const { outputDirectory } = config

initializeDirectory(outputDirectory);

exports.writeFile = (filename, contents) => {
  const filenameWithPath = `${outputDirectory}/${filename}`;
  
  try {
    console.log(`Writing ${filenameWithPath}`)
    fs.writeFileSync(filenameWithPath, contents);
  } catch (error) {
    console.error(`Error writing ${filenameWithPath}. ${error.message}`);
    throw error;
  }
}
