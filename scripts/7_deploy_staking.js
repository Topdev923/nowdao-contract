const { ethers } = require("hardhat");
const fs = require("fs");
const {
  EPOCH_LENGTH_IN_BLOCKS,
  FIRST_EPOCH_NUMBER,
  FIRST_EPOCH_BLOCK,
} = require("../utils/bsctest/constants");
let address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy Staking
  const Staking = await ethers.getContractFactory("NowDaoStaking");
  const staking = await Staking.deploy(
    address.NMETA,
    address.NUSD,
    EPOCH_LENGTH_IN_BLOCKS,
    FIRST_EPOCH_NUMBER,
    FIRST_EPOCH_BLOCK
  );
  console.log("Staking deployed to:", staking.address);

  address["Staking"] = staking.address;
  fs.writeFileSync("./utils/bsctest/address.json", JSON.stringify(address));
  console.log("Saved the addresses.");
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
