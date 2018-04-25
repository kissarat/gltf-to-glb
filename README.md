# Asset pipeline

[![dependencies](https://david-dm.org/timvanscherpenzeel/asset-pipeline.svg)](https://david-dm.org/timvanscherpenzeel/asset-pipeline)
[![devDependencies](https://david-dm.org/timvanscherpenzeel/asset-pipeline/dev-status.svg)](https://david-dm.org/timvanscherpenzeel/asset-pipeline#info=devDependencies)

CLI tool for packing various assets effeciently for use in production.

Initially focused on setting up a proper `glTF` to `glb` workflow including `Draco` compression and texture compression using `texture-compressor`. Later will be expanded to effectively handle pack

## Installation

```sh
$ git submodule init
$ git submodule update
$ npm --prefix ./submodules/gltf-pipeline install ./submodules/gltf-pipeline
$ npm --prefix ./submodules/texture-compressor install ./submodules/texture-compressor
```

## Example

```sh
$ node bin/asset-pipeline.js -i ./submodules/glTF-Sample-Models/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf -o ./output/example.glb
```

## Flags

### Required
	-i, --input [example: ./input/example.gltf] [required]
	-o, --output [example: ./output/example.glb] [required]

## Licence

My work is released under the [MIT licence](https://raw.githubusercontent.com/TimvanScherpenzeel/asset-pipeline/master/LICENSE).
