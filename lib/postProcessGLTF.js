module.exports = (result) => {
	const { glb } = result;
	const { externalResources } = result;

	return {
		glb,
		externalResources,
	};
};
