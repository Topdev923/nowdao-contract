const { ethers } = require("hardhat");
const { LARGE_APPROVAL } = require("../utils/bsctest/constants");
const address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();

  const Nmeta = await ethers.getContractFactory("NMETA");
  const nmeta = await Nmeta.attach(address.NMETA);
  console.log("NMETA address:", nmeta.address);

  await nmeta.transferOwnership(address.Treasury);
  console.log("Set treasury for NMETA token");

  await nmeta.approve(address.Staking, LARGE_APPROVAL);
  console.log("NMETA approved Staking");

  await nmeta.approve(address.Helper, LARGE_APPROVAL);
  console.log("NMETA approved StakingHelper");

  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
