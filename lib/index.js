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
const { getFileExtension } = require('./utilities');

const pipe = () => {
	const inputFileExtension = getFileExtension(input);

	if (SUPPORTED_INPUT_TYPES.includes(inputFileExtension)) {
		fileLoader(input)
			.then((data) => {
				gltfToGlb(JSON.parse(data))
					.then((result) => {
						console.log(result);
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
