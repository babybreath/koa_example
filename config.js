'use strict';

const path = require('path');
const packageJson = require('./package.json');

module.exports = {
	PROJECT_NAME: packageJson.name,
	ROOT_PATH: __dirname,
	PUBLIC_PATH: path.join(__dirname, "build")
};
