const fs = require('fs');
const assert = require('assert');

assert('WebAssembly' in global,
  'WebAssembly global object not detected');

// Convert node Buffer to Uint8Array
const toUint8Array = (buf) => {
  const u = new Uint8Array(buf.length);
  for (let i = 0; i < buf.length; ++i) {
    u[i] = buf[i]
  }
  return u;
};

const getFileBuffer = filePath => new Promise((resolve, reject) => {
  fs.readFile(filePath, (error, data) => {
    if (error) reject(error);
    const buffer = toUint8Array(data);
    resolve(buffer);
  })
});

const cleanupFunctionNames = (instance) => {
  const updatedExports = {};
  const { exports } = instance;
  Object.keys(exports).forEach((functionName) => {
    let updatedFunctionName = functionName;
    if (functionName.charAt(0) === '_' && functionName.charAt(1) !== '_') {
      updatedFunctionName = functionName.substr(1);
    }
    updatedExports[updatedFunctionName] = exports[functionName];
  });
  return Object.assign({}, instance, { exports: updatedExports });
};

const loadWebAssembly = (filePath, imports) =>
  getFileBuffer(filePath)
    .then(bytes => WebAssembly.compile(bytes))
    .then(module => WebAssembly.instantiate(module, imports))
    .then(instance => cleanupFunctionNames(instance));

module.exports = loadWebAssembly;
