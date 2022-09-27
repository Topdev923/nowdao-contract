const { ethers } = require("hardhat");
const address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();

  const Staking = await ethers.getContractFactory("NowDaoStaking");
  const staking = await Staking.attach(address.Staking);
  console.log("Staking address:", staking.address);

  await staking.setContract("0", address.Distributor);
  console.log("Set distributor contract");

  await staking.setContract("1", address.Warmup);
  console.log("Set warmup contract");

  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
