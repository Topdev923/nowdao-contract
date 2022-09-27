const { ethers } = require("hardhat");
const fs = require("fs");
let address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy bonding calculator
  const Calculator = await ethers.getContractFactory("NowDaoBondingCalculator");
  const calculator = await Calculator.deploy(address.NMETA);
  console.log("Calculator deployed to:", calculator.address);

  address["Calculator"] = calculator.address;
  fs.writeFileSync("./utils/bsctest/address.json", JSON.stringify(address));
  console.log("Saved the addresses.");
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
