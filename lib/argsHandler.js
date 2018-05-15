// Native
const pkg = require('../package.json');

// Vendor
const {
	ArgumentParser,
} = require('argparse');

const createParserArguments = () => {
	const parser = new ArgumentParser({
		version: pkg.version,
		addHelp: true,
		description: pkg.description,
	});

	// Draco flag
	parser.addArgument(['-d', '--draco'], {
		help: 'Use Draco compression',
		action: 'storeTrue',
		required: false,
	});

	// File input flag
	parser.addArgument(['-i', '--input'], {
		help: 'Input file including path',
		required: true,
	});

	// File output flag
	parser.addArgument(['-o', '--output'], {
		help: 'Output file including path',
		required: true,
	});

	// Post process flag
	parser.addArgument(['-post', '--postProcess'], {
		help: 'Post process file including path',
		required: false,
	});

	// Post process flag
	parser.addArgument(['-pre', '--preProcess'], {
		help: 'Pre process file including path',
		required: false,
	});

	// Seperate texture flag
	parser.addArgument(['-s', '--separateTextures'], {
		help: 'Write out separate textures',
		action: 'storeTrue',
		required: false,
	});

	const args = parser.parseArgs();

	return args;
};

const args = createParserArguments();

module.exports = args;

