// Vendor
const pako = require('pako');

module.exports = (result) => {
  const data = result;
  const { glb } = data;
  const compressedGlb = pako.deflate(glb);

  return {
    glb: compressedGlb,
    separateResources: data.separateResources,
  };
};
