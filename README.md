# Gltf-to-glb

[![dependencies](https://david-dm.org/timvanscherpenzeel/gltf-to-glb.svg)](https://david-dm.org/timvanscherpenzeel/gltf-to-glb)
[![devDependencies](https://david-dm.org/timvanscherpenzeel/gltf-to-glb/dev-status.svg)](https://david-dm.org/timvanscherpenzeel/gltf-to-glb#info=devDependencies)

CLI tool for packing glTF to glb.

## Installation

```sh
$ npm install

$ git submodule init
$ git submodule update

$ npm --prefix ./submodules/gltf-pipeline install ./submodules/gltf-pipeline
$ npm --prefix ./submodules/texture-compressor install ./submodules/texture-compressor
```

## Example

```sh
$ node bin/gltf-to-glb.js -i ./submodules/glTF-Sample-Models/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf -o ./output/DamagedHelmet.glb
```

## Flags

### Required
	-i, --input [example: ./input/example.gltf] [required]
	-o, --output [example: ./output/example.glb] [required]

## Resources

- [Prepack](https://github.com/facebook/prepack) is a partial evaluator for JavaScript. Prepack rewrites a JavaScript bundle, resulting in JavaScript code that executes more efficiently.

## Licence

My work is released under the [MIT licence](https://raw.githubusercontent.com/TimvanScherpenzeel/gltf-to-glb/master/LICENSE).
