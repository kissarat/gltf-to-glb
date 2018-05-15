// Native
const fs = require('fs');
const path = require('path');

// Vendor
const gltfPipeline = require('../submodules/gltf-pipeline');

// Arguments
const {
	draco,
    input,
	output,
	postProcess,
	preProcess,
	separateTextures,
} = require('./argsHandler');

// Constants
const { SUPPORTED_INPUT_TYPES } = require('./constants');

// File loader
const fileLoader = require('./fileLoader');

// Process
/* eslint-disable import/no-dynamic-require */
const postProcessPlugin = postProcess ? require(path.resolve(postProcess)) : false;
const preProcessPlugin = preProcess ? require(path.resolve(preProcess)) : false;
/* eslint-enable */

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
				const preProcessed = preProcess ? preProcessPlugin(parsedGltf) : parsedGltf;

				let options = {
					resourceDirectory: getFilePath(input),
				};

				options = draco ? { ...options, ...{ dracoOptions: true } } : options;
				options = separateTextures ? { ...options, ...{ separateTextures: true } } : options;

				gltfPipeline.gltfToGlb(preProcessed, options)
					.then((result) => {
						const postProcessed = postProcess ? postProcessPlugin(result) : result;

						fs.writeFile(output, postProcessed.glb, (error) => {
							if (!error) {
								console.log(`Written file to ${output}`);
							} else {
								console.error(error);
							}
						});

						if (postProcessed.externalResources) {
							Object.keys(postProcessed.externalResources).forEach((resource) => {
								fs.writeFile(`${getFilePath(output)}${resource}`, postProcessed.externalResources[resource], (error) => {
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
