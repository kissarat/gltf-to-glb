// Native
const fs = require('fs');
const path = require('path');

// Vendor
const gltfPipeline = require('../submodules/gltf-pipeline');
const { gltfToGlb } = gltfPipeline;

// Arguments
const {
    input,
    output,
} = require('./argsHandler');

// Constants
const { SUPPORTED_INPUT_TYPES } = require('./constants');

const fileLoader = require('./fileLoader');

// Utilities
const {
	getFileExtension,
	getFilePath,
} = require('./utilities');

const pipe = () => {
	const inputFileExtension = getFileExtension(input);

	if (SUPPORTED_INPUT_TYPES.includes(inputFileExtension)) {
		fileLoader(input)
			.then((data) => {
				const options = {
					resourceDirectory: getFilePath(input),
				};

				gltfToGlb(JSON.parse(data), options)
					.then((result) => {
						fs.writeFile(output, result.glb, (error) => {
							if (!error) {
								console.log(`Written file to ${output}`);
							} else {
								console.error(error);
							}
						});
					})
					.catch((error) => {
						console.error(error);
					});
			});
	} else {
		console.error(`${inputFileExtension} is not supported.`);
		console.error(`The supported file extensions are: [${SUPPORTED_INPUT_TYPES}]`);
	}
};

pipe();
