# glTF to GLB

[![dependencies](https://david-dm.org/timvanscherpenzeel/gltf-to-glb.svg)](https://david-dm.org/timvanscherpenzeel/gltf-to-glb)
[![devDependencies](https://david-dm.org/timvanscherpenzeel/gltf-to-glb/dev-status.svg)](https://david-dm.org/timvanscherpenzeel/gltf-to-glb#info=devDependencies)

CLI tool for packing glTF to GLB.

`gltf-to-glb` extends the functionality of [gltf-pipeline](https://github.com/AnalyticalGraphicsInc/gltf-pipeline/tree/2.0) by adding hooks for preprocessing of `glTF` files and postprocessing of `GLB` files allowing you to more easily plug in certain transformations and optimisations without having to modify the library.

Please note that until further notice `gltf-to-glb` uses the `2.0` branch of [gltf-pipeline](https://github.com/AnalyticalGraphicsInc/gltf-pipeline/tree/2.0) which is currently in active development and has not yet been stabilized.

## Installation

```sh
$ npm install

$ git submodule init
$ git submodule update

$ npm --prefix ./submodules/gltf-pipeline install ./submodules/gltf-pipeline

$ git submodule update --recursive --remote --force
```

## Live demo

[Live demo](https://timvanscherpenzeel.github.io/gltf-to-glb/) of a Draco compressed glTF file rendered in [Three.js](https://github.com/mrdoob/three.js) using HDR Image-based Lighting with run-time generated pre-filtered roughness mipmaps.

![Screenshot](docs/viewer/assets/helmet.jpg?raw=true)

## Example

Before adding further optimizations like Draco and ZLib compression you have to ask yourself: does it make sense in my context? At what point does it start making sense to use these type of optimizations?

I would say: only when you are dealing with a lot of geometry and a lot of models in your scene. Only then the upfront cost of the ZLib inflating, the Draco decodeing and decompression will make up for itself. When you have a single model like in the [live demo](https://timvanscherpenzeel.github.io/gltf-to-glb/) it is likely not worth it. A use case as shown in the video [Draco 3D Geometry Compression: Comparing Draco to gzip](https://www.youtube.com/watch?v=6sOgrBWjkcQ) by `Google Open Source` shows a usecase where it clearly is worth it.

Please note that textures don't compress well so the cost of ZLib inflating is only really worth it if your model is geometry heavy.

`glTF to glb` ~ 4.8M (gltf embedded) > 3.6M (glb, requires no decompression)

```sh
$ node bin/gltf-to-glb.js -i ./submodules/glTF-Sample-Models/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf -o ./output/DamagedHelmet.glb
```

`glTF to glb using Draco compression` ~ 4.8M (gltf embedded) > 3.1M (glb, requires Draco decompression)

```sh
$ node bin/gltf-to-glb.js -i ./submodules/glTF-Sample-Models/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf -o ./output/DamagedHelmet_draco_zlib.glb -d
```

`glTF to glb using Draco compression and ZLib postprocess compression` ~ 4.8M (gltf embedded) > 3.0M (glb, requires ZLib inflating and Draco decompression)

```sh
$ node bin/gltf-to-glb.js -i ./submodules/glTF-Sample-Models/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf -o ./output/DamagedHelmet_draco_zlib.glb -post ./plugins/ZLibDeflatePostProcess.js -d
```

## Flags

### Required

    -i, --input [example: ./input/example.gltf] [required]
    -o, --output [example: ./output/example.glb] [required]

### Optional

    -d, --draco [true / false, default: false] [not required]
    -s, --seperateTextures [true / false, default: false] [not required]
    -pre, --preProcess [example: ./plugins/examplePreProcess.js] [not required]
    -post, --postProcess [example ./plugins/examplePostProcess.js] [not required]

## Resources

- [glTF 2.0 specification](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0)
- [glTF 2.0 sample models](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/)
- [Blender glTF 2.0 exporter](https://github.com/KhronosGroup/glTF-Blender-Exporter)
- [Drag-and-drop glTF 2.0 WebGL viewer using Three.js](https://github.com/donmccurdy/three-gltf-viewer)
- [Optimizing GLTF files as exported by Blender](https://gist.github.com/mattdesl/aea40285e2d73916b6b9101b36d84da8)
- [COLLADA2GLTF](https://github.com/KhronosGroup/COLLADA2GLTF)
- [COLLADA2GLTF build instructions for MacOS](https://gist.github.com/TimvanScherpenzeel/457b699a38890539fc659805ca9812e2)
- [Creating ‘Qalam’ (Shared geometry, GLB, Draco compression, Base64 + GZip / MIME type trickery, loading strategies, web workers and transferable objects) by Matt Greenhalgh, Stink Studios](https://medium.com/@stinkstudios/creating-qalam-d016a0a52d56)
- [Helix.js uses ZLib inflate / deflate for binary FBX deserialization](https://github.com/DerSchmale/helixjs/blob/a5625182674cb1d1ba5c2f53cd89a6654b423915/src/helix-io/fbx/FBXBinaryDeserializer.js)

## Licence

My work is released under the [MIT licence](https://raw.githubusercontent.com/TimvanScherpenzeel/gltf-to-glb/master/LICENSE).
