const { ethers } = require("hardhat");
const fs = require("fs");
const { BUSD_ADDRESS } = require("../utils/bsctest/constants");
let address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy treasury
  const Treasury = await ethers.getContractFactory("NowDaoTreasury");
  const treasury = await Treasury.deploy(
    address.NMETA,
    BUSD_ADDRESS,
    0
  );
  console.log("Treasury deployed to:", treasury.address);

  address["Treasury"] = treasury.address;
  fs.writeFileSync("./utils/bsctest/address.json", JSON.stringify(address));
  console.log("Saved the addresses.");
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
