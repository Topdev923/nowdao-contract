const { ethers } = require("hardhat");
const fs = require("fs");
const {
  EPOCH_LENGTH_IN_BLOCKS,
  FIRST_EPOCH_BLOCK,
} = require("../utils/bsctest/constants");
let address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy staking distributor
  const Distributor = await ethers.getContractFactory("Distributor");
  const distributor = await Distributor.deploy(
    address.Treasury,
    address.NMETA,
    EPOCH_LENGTH_IN_BLOCKS,
    FIRST_EPOCH_BLOCK
  );
  console.log("Distributor deployed to:", distributor.address);

  address["Distributor"] = distributor.address;
  fs.writeFileSync("./utils/bsctest/address.json", JSON.stringify(address));
  console.log("Saved the addresses.");
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
