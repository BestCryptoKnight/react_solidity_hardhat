# dapp-sample

A sample full stack dApp with React, Ethers.js, Solidity, and Hardhat

This project demonstrates a basic Hardhat use case. It has a sample contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

## Compile contracts to generate artifacts

```shell
npx hardhat compile
```

## Deploying and using a local network / blockchain

```shell
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

After running deploy script, you should be able to see something like this as an output on the CLI:

```
Sample deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa38000
```

This address is what we will use in our client application to talk to the smart contract. Keep this address available and paste it to contractAddress parameter inside App.tsx of client application.

## Running the client

```
yarn start
```

## Some of the the other tasks

```shell
npx hardhat accounts
npx hardhat clean
npx hardhat test
npx hardhat help
```
////0x5FbDB2315678afecb367f032d93F642f64180aa3