const { ethers } = require("hardhat");
const fs = require("fs");
let address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy wNUSD
  const wNusd = await ethers.getContractFactory("wNUSD");
  const wnusd = await wNusd.deploy(address.NUSD);
  console.log("wINGOT deployed to:", wnusd.address);

  address["wNUSD"] = wnusd.address;
  fs.writeFileSync("./utils/bsctest/address.json", JSON.stringify(address));
  console.log("Saved the addresses.");
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
