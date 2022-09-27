const { ethers } = require("hardhat");
const address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();

  const Helper = await ethers.getContractFactory("StakingHelper");
  const helper = await Helper.attach(address.Helper);
  console.log("StakingHelper address:", helper.address);

  await helper.stake(ethers.utils.parseUnits("10", 18), deployer.address);
  console.log("Staked NMETA through helper");

  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
