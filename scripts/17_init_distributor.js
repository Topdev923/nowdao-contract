const { ethers } = require("hardhat");
const { INITIAL_REWARD_RATE } = require("../utils/bsctest/constants");
const address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();

  const Distributor = await ethers.getContractFactory("Distributor");
  const distributor = await Distributor.attach(address.Distributor);
  console.log("Distributor address:", distributor.address);

  await distributor.addRecipient(address.Staking, INITIAL_REWARD_RATE);
  console.log("Add staking contract as distributor recipient");

  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
