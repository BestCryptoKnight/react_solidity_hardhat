const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Sample", function () {
  it("Should return the new message once it's changed", async function () {
    const Sample = await ethers.getContractFactory("Sample");
    const sample = await Sample.deploy("Hello, world!");
    await sample.deployed();

    expect(await sample.getMessage()).to.equal("Hello, world!");

    const setMessageTx = await sample.setMessage("Hola, mundo!");

    // wait until the transaction is mined
    await setMessageTx.wait();

    expect(await sample.getMessage()).to.equal("Hola, mundo!");
  });
});
