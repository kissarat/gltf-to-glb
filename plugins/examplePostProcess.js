module.exports = (result) => {
	const data = result;

	console.log(data);

	return {
		glb: data.glb,
		externalResources: data.externalResources,
	};
};
