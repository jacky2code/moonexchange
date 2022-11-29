/**
 * @Author: GKing
 * @Date: 2022-11-15 20:20:56
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-29 14:46:41
 * @Description: 
 */
require('babel-register');
require('babel-polyfill');
require('dotenv').config();


module.exports = {
  
  contracts_directory: './src/contracts',
  contracts_build_directory: './src/abis',
  migrations_directory: "./migrations",

  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
  },

  

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.17", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       },
      //  evmVersion: "byzantium"
      }
    }
  }
  
};
