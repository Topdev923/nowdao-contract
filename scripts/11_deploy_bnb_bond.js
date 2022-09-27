const { ethers } = require("hardhat");
const fs = require("fs");
const {
  WBNB_ADDRESS,
  BNB_USD_PRICE_FEED_ADDRESS,
} = require("../utils/bsctest/constants");
let address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy BNB bond
  const BnbBond = await ethers.getContractFactory("NowDaoBnbBondDepository");
  const bnbBond = await BnbBond.deploy(
    address.NMETA,
    WBNB_ADDRESS,
    address.Treasury,
    address.DAO,
    BNB_USD_PRICE_FEED_ADDRESS
  );
  console.log("BnbBond deployed to:", bnbBond.address);

  address["BnbBond"] = bnbBond.address;
  fs.writeFileSync("./utils/bsctest/address.json", JSON.stringify(address));
  console.log("Saved the addresses.");
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
