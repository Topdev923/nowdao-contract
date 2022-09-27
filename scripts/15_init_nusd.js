const { ethers } = require("hardhat");
const { INITIAL_INDEX } = require("../utils/bsctest/constants");
const address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();

  const Nusd = await ethers.getContractFactory("NUSD");
  const nusd = await Nusd.attach(address.NUSD);
  console.log("NUSD address:", nusd.address);

  await nusd.initialize(address.Staking);
  console.log("NUSD initialized");

  await nusd.setIndex(INITIAL_INDEX);
  console.log("NUSD set initial index");

  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
