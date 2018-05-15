// https://gist.github.com/mattdesl/aea40285e2d73916b6b9101b36d84da8

module.exports = (gltf) => {
	const data = gltf;

	const { accessors } = data;
	const { nodes } = data;
	const { meshes } = data;
	const { animations } = data;
	const { skins } = data;

	console.log(meshes[0].primitives);

	// nodes.forEach((node, i) => {
	// 	console.log(node);
	// });

	// console.log(gltf.accessors);

	// accessors.forEach((accesor, i) => {
	// 	console.log(accesor, i);
	// });

	// console.log(gltf.bufferViews);

	// const { scenes } = data;

	// console.log(scenes);

	animations.forEach((animation) => {
		const { channels } = animation;
		const { samplers } = animation;

		// console.log(channels, samplers);
	});

	return data;
};
