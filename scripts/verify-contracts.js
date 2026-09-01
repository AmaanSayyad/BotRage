const fs = require('fs');
const path = require('path');
const solc = require('solc');

const nodeRegistrySource = fs.readFileSync(path.join(__dirname, '../contracts/src/NodeRegistry.sol'), 'utf8');
const rewardPoolSource = fs.readFileSync(path.join(__dirname, '../contracts/src/RewardPool.sol'), 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'NodeRegistry.sol': { content: nodeRegistrySource },
    'RewardPool.sol': { content: rewardPoolSource }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode']
      }
    }
  }
};

// Custom import callback for relative imports
function findImports(importPath) {
  if (importPath === './NodeRegistry.sol' || importPath === 'NodeRegistry.sol') {
    return { contents: nodeRegistrySource };
  }
  return { error: 'File not found' };
}

const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

if (output.errors) {
  let hasError = false;
  output.errors.forEach(err => {
    console.log(err.formattedMessage);
    if (err.severity === 'error') hasError = true;
  });
  if (hasError) {
    console.error('Compilation failed!');
    process.exit(1);
  }
}

console.log('✅ Solidity Smart Contracts compiled successfully with zero errors!');
console.log('Contracts compiled:');
for (const file in output.contracts) {
  for (const contract in output.contracts[file]) {
    console.log(` - ${contract} (Bytecode size: ${output.contracts[file][contract].evm.bytecode.object.length / 2} bytes)`);
  }
}
