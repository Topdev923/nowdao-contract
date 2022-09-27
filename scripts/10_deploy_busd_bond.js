const { ethers } = require("hardhat");
const fs = require("fs");
const {
  BUSD_ADDRESS,
  ZERO_ADDRESS,
} = require("../utils/bsctest/constants");
let address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy BUSD bond
  const BUSDBond = await ethers.getContractFactory("NowDaoBondDepository");
  const busdBond = await BUSDBond.deploy(
    address.NMETA,
    BUSD_ADDRESS,
    address.Treasury,
    address.DAO,
    ZERO_ADDRESS
  );
  console.log("BusdBond deployed to:", busdBond.address);

  address["BusdBond"] = busdBond.address;
  fs.writeFileSync("./utils/bsctest/address.json", JSON.stringify(address));
  console.log("Saved the addresses.");
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
