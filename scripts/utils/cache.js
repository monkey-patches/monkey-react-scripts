function patchModule(key, value) {
    const configModule = require.cache[require.resolve(key)];
    configModule.exports = value;
}

module.exports = patchModule;