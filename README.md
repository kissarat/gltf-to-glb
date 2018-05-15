# glTF to GLB

[![dependencies](https://david-dm.org/timvanscherpenzeel/gltf-to-glb.svg)](https://david-dm.org/timvanscherpenzeel/gltf-to-glb)
[![devDependencies](https://david-dm.org/timvanscherpenzeel/gltf-to-glb/dev-status.svg)](https://david-dm.org/timvanscherpenzeel/gltf-to-glb#info=devDependencies)

CLI tool for packing glTF to GLB.

`gltf-to-glb` extends the functionality of [gltf-pipeline](https://github.com/AnalyticalGraphicsInc/gltf-pipeline/tree/2.0).

## Installation

```sh
$ npm install

$ git submodule init
$ git submodule update

$ npm --prefix ./submodules/gltf-pipeline install ./submodules/gltf-pipeline

$ git submodule update --recursive --remote --force
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
	-pre, --preProcess [example: ./lib/plugins/examplePreProcess.js] [not required]
	-post, --postProcess [example ./lib/plugins/examplePostProcess.js] [not required]

## Resources

- [glTF 2.0 specification](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0)
- [Blender glTF 2.0 exporter](https://github.com/KhronosGroup/glTF-Blender-Exporter)
- [Drag-and-drop glTF 2.0 WebGL viewer using Three.js](https://github.com/donmccurdy/three-gltf-viewer)

## Licence

My work is released under the [MIT licence](https://raw.githubusercontent.com/TimvanScherpenzeel/gltf-to-glb/master/LICENSE).
