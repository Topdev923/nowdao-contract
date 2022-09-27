const { ethers } = require("hardhat");
const fs = require("fs");
let address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy NMETA-BUSD bond
  const NmetaBusdBond = await ethers.getContractFactory(
    "NowDaoBondDepository"
  );
  const nmetaBusdBond = await NmetaBusdBond.deploy(
    address.NMETA,
    address.NmetaBusd,
    address.Treasury,
    address.DAO,
    address.Calculator
  );
  console.log("NmetaBusdBond deployed to:", nmetaBusdBond.address);

  address["NmetaBusdBond"] = nmetaBusdBond.address;
  fs.writeFileSync("./utils/bsctest/address.json", JSON.stringify(address));
  console.log("Saved the addresses.");
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
