const { ethers } = require("hardhat");
const fs = require("fs");
let address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy staking warmpup
  const StakingWarmpup = await ethers.getContractFactory("StakingWarmup");
  const stakingWarmup = await StakingWarmpup.deploy(
    address.Staking,
    address.NUSD
  );
  console.log("StakingWarmup deployed to:", stakingWarmup.address);

  address["Warmup"] = stakingWarmup.address;
  fs.writeFileSync("./utils/bsctest/address.json", JSON.stringify(address));
  console.log("Saved the addresses.");
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
