// Native
const fs = require('fs');

// Vendor
const gltfPipeline = require('../submodules/gltf-pipeline');

// Arguments
const {
	draco,
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
			.then((gltf) => {
				const parsedGltf = JSON.parse(gltf);

				// console.log(parsedGltf);

				if (draco) {
					console.log('Using Draco compression');
				}

				const options = {
					dracoOptions: draco,
					// separateTextures: true,
					resourceDirectory: getFilePath(input),
				};

				gltfPipeline.gltfToGlb(parsedGltf, options)
					.then((result) => {
						fs.writeFile(output, result.glb, (error) => {
							if (!error) {
								console.log(`Written file to ${output}`);
							} else {
								console.error(error);
							}
						});

						if (result.externalResources) {
							Object.keys(result.externalResources).forEach((resource) => {
								fs.writeFile(`${getFilePath(output)}${resource}`, result.externalResources[resource], (error) => {
									if (!error) {
										console.log(`Written file to ${output}${resource}`);
									} else {
										console.error(error);
									}
								});
							});
						}
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
