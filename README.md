# glTF to GLB

[![dependencies](https://david-dm.org/timvanscherpenzeel/gltf-to-glb.svg)](https://david-dm.org/timvanscherpenzeel/gltf-to-glb)
[![devDependencies](https://david-dm.org/timvanscherpenzeel/gltf-to-glb/dev-status.svg)](https://david-dm.org/timvanscherpenzeel/gltf-to-glb#info=devDependencies)

CLI tool for packing glTF to GLB.

## Installation

```sh
$ npm install

$ git submodule init
$ git submodule update

$ npm --prefix ./submodules/gltf-pipeline install ./submodules/gltf-pipeline
```

## Example

```sh
$ node bin/gltf-to-glb.js -i ./submodules/glTF-Sample-Models/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf -o ./output/DamagedHelmet.glb
```

## Flags

### Required
	-i, --input [example: ./input/example.gltf] [required]
	-o, --output [example: ./output/example.glb] [required]

### Optional
	-d, --draco [true / false, default: false] [not required]
	-s, --seperateTextures [true / false, default: false] [not required]

## Licence

My work is released under the [MIT licence](https://raw.githubusercontent.com/TimvanScherpenzeel/gltf-to-glb/master/LICENSE).
