const loadWebAssembly = require('./load');

const wasmImports = {
  env: {
    memoryBase: 0,
    tableBase: 0,
    memory: new WebAssembly.Memory({ initial: 256 }),
    table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
  }
};

loadWebAssembly(`${process.cwd()}/wasm/output/lowasm.wasm`, wasmImports)
  .then(m => {
    console.log(m.exports.clamp(10, 20, 5));
  })
  .catch(error => console.log(error));
