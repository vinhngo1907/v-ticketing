const readPkgUp = require('read-pkg-up');
const semver = require('semver');

let oldestSupportedReactVersion = '17.0.1';

// Get react version from package.json and used it in lint configuration
try {
    const pkg = readPkgUp.sync({ normalize: true });
    const allDeps = Object.assign(
        { react: '17.0.1' },
        pkg.peerDependencies,
        pkg.devDependencies,
        pkg.dependencies
    );

    oldestSupportedReactVersion = semver
        .validRange(allDeps.react)
        .replace(/[>=<|]/g, ' ')
        .split(' ')
        .filter(Boolean)
        .sort(semver.compare)[0];
} catch (error) {
    // ignore error
}

module.exports = {
    extends: ['plugin:react-hooks/recommended'],
    plugins: ['react', 'react-hooks'],
    settings: {
        react: {
            version: oldestSupportedReactVersion,
        },
    },
    rules: {
        'react/jsx-fragments': ['warn', 'element'],
        'react-hooks/rules-of-hooks': 'warn',
        'react/prop-types': 0,
        'react/display-name': 0,
        'react/react-in-jsx-scope': 0,
    },
};
