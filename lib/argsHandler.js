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
		help: 'Use Draco to efficiently encode geometry',
		action: 'storeTrue',
		required: false,
		defaultValue: false,
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

	const args = parser.parseArgs();

	return args;
};

const args = createParserArguments();

module.exports = args;

