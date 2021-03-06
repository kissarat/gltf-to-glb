// Native
const fs = require('fs');
const path = require('path');

// Vendor
const gltfValidator = require('gltf-validator');
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
const { getFileExtension, getFilePath } = require('./utilities');

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

        if (draco) {
          console.log('Using Draco compression');
          options = { ...options, ...{ dracoOptions: true } };
        }

        if (separateTextures) {
          console.log('Writing out separate textures');
          options = { ...options, ...{ separateTextures: true } };
        }

        gltfValidator
          .validateBytes(new Uint8Array(Buffer.from(JSON.stringify(preProcessed))))
          .then((report) => {
            console.log(JSON.stringify(report, null, '  '));
          })
          .catch((error) => {
            console.warn('Validation failed: ', error);
          });

        gltfPipeline
          .gltfToGlb(preProcessed, options)
          .then((result) => {
            const postProcessed = postProcess ? postProcessPlugin(result) : result;

            fs.writeFile(output, postProcessed.glb, (error) => {
              if (!error) {
                console.log(`Written file to ${output}`);
              } else {
                console.error(error);
              }
            });

            if (postProcessed.separateResources) {
              Object.keys(postProcessed.separateResources).forEach((resource) => {
                fs.writeFile(
                  `${getFilePath(output)}${resource}`,
                  postProcessed.separateResources[resource],
                  (error) => {
                    if (!error) {
                      console.log(`Written file to ${output}${resource}`);
                    } else {
                      console.error(error);
                    }
                  },
                );
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    console.error(`${inputFileExtension} is not supported.`);
    console.error(`The supported file extensions are: [${SUPPORTED_INPUT_TYPES}]`);
  }
};

pipe();
