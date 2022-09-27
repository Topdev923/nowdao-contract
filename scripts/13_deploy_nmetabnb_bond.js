const { ethers } = require("hardhat");
const fs = require("fs");
let address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy NMETA-BUSD bond
  const NmetaBnbBond = await ethers.getContractFactory(
    "NowDaoBondDepository"
  );
  const nmetaBnbBond = await NmetaBnbBond.deploy(
    address.NMETA,
    address.NmetaBnb,
    address.Treasury,
    address.DAO,
    address.Calculator
  );
  console.log("NmetaBnbBond deployed to:", nmetaBnbBond.address);

  address["NmetaBnbBond"] = nmetaBnbBond.address;
  fs.writeFileSync("./utils/bsctest/address.json", JSON.stringify(address));
  console.log("Saved the addresses.");
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
