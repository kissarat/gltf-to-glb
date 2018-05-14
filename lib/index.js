// Native
const fs = require('fs');

// Vendor
const gltfPipeline = require('../submodules/gltf-pipeline');

// Arguments
const {
	draco,
    input,
	output,
	separateTextures,
} = require('./argsHandler');

// Constants
const { SUPPORTED_INPUT_TYPES } = require('./constants');

// File loader
const fileLoader = require('./fileLoader');

// Process
const postProcessGLTF = require('./postProcessGLTF');
const preProcessGLTF = require('./preProcessGLTF');

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
				const preProcessedGLTF = preProcessGLTF(parsedGltf);

				let options = {
					resourceDirectory: getFilePath(input),
				};

				options = draco ? { ...options, ...{ dracoOptions: true } } : options;
				options = separateTextures ? { ...options, ...{ separateTextures: true } } : options;

				gltfPipeline.gltfToGlb(preProcessedGLTF, options)
					.then((result) => {
						const postProcessedGLTF = postProcessGLTF(result);

						fs.writeFile(output, postProcessedGLTF.glb, (error) => {
							if (!error) {
								console.log(`Written file to ${output}`);
							} else {
								console.error(error);
							}
						});

						if (postProcessedGLTF.externalResources) {
							Object.keys(postProcessedGLTF.externalResources).forEach((resource) => {
								fs.writeFile(`${getFilePath(output)}${resource}`, postProcessedGLTF.externalResources[resource], (error) => {
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
