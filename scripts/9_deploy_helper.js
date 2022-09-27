const { ethers } = require("hardhat");
const fs = require("fs");
let address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy staking helper
  const StakingHelper = await ethers.getContractFactory("StakingHelper");
  const stakingHelper = await StakingHelper.deploy(
    address.Staking,
    address.NMETA
  );
  console.log("StakingHelper deployed to:", stakingHelper.address);

  address["Helper"] = stakingHelper.address;
  fs.writeFileSync("./utils/bsctest/address.json", JSON.stringify(address));
  console.log("Saved the addresses.");
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
