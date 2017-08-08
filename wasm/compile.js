/* External dependencies */
const fs = require('fs');
const { exec } = require('child_process');
const { red, cyan } = require('chalk');

const wasmConfig = {
  emsdkPath: `${process.env.HOME}/Tooling/emsdk`,
  inputFile: `${process.cwd()}/lib/lowasm.cc`,
  outputFile: `${process.cwd()}/wasm/output/lowasm.js`,
  flags: [
    '-s WASM=1',
    '-s ASSERTIONS=1',
    '-s SIDE_MODULE=1',
    '-O3',
  ],
};

const checkEmscriptenPath = () => {
  const fullPath = wasmConfig.emsdkPath;
  if (!fs.existsSync(fullPath)) {
    console.log(red('Emscripten path not found'));
    return false;
  }
  return fullPath;
};

const compileWasm = () => {
  const { flags, inputFile, outputFile} = wasmConfig;
  const execFlags = flags.join(' ');
  const command = `emcc ${inputFile} -o ${outputFile} ${execFlags}`;
  exec(command, { shell: '/bin/bash' }, (error, stdout, stderr) => {
    if (stderr) {
      console.log(red('EMSCRIPTEN compile error\n'));
      console.log(stderr);
    } else {
      console.log(stdout);
      console.log(cyan('Compiled!'))
    }
  })
};

if (checkEmscriptenPath()) {
  compileWasm();
}
