const { ethers } = require("hardhat");
const fs = require("fs");
let address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy NUSD
  const Nusd = await ethers.getContractFactory("NUSD");
  const nusd = await Nusd.deploy();
  console.log("NUSD deployed to:", nusd.address);

  address["NUSD"] = nusd.address;
  fs.writeFileSync("./utils/bsctest/address.json", JSON.stringify(address));
  console.log("Saved the addresses.");
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
