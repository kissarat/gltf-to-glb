// Native
const fs = require('fs');

// Vendor
const gltfPipeline = require('../submodules/gltf-pipeline');

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
			.then((gltf) => {
				const options = {
					dracoOptions: true,
					// separateTextures: true,
					resourceDirectory: getFilePath(input),
				};

				const parsedGltf = JSON.parse(gltf);

				// const { images } = parsedGltf;

				// const imagesData = images.forEach((image) => {
				// 	console.log(image.uri);
				// });

				console.log(parsedGltf);

				// In order to support texture compressed GLB's one needs to replace the existing URI's with generated URI's.

				// image/ktx
				// mimeType
				// How to effectively embed files?

				// GLTF extensions are not allowed to modify the internal structure of the file
				// Extensions extend the base functionality and must ship a fallback.
				// In order handle compressed textures and prevent shipping an extra fallback I must modify the GLB format itself
				// This is suitable as a final step in a production environment but never as an intermediary format. Therefore the file format should specify itself as a .bin

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
