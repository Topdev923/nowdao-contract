const { ethers } = require("hardhat");
const { BUSD_ADDRESS } = require("../utils/bsctest/constants");
const address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();

  const Treasury = await ethers.getContractFactory("NowDaoTreasury");
  const treasury = await Treasury.attach(address.Treasury);
  console.log("Treasury address:", treasury.address);

  // Deposit 90 BUSD to treasury, 80 NMETA gets minted to deployer and 10 BUSD are in treasury as excesss reserves
  await treasury.deposit(
    ethers.utils.parseUnits("90", 18),
    BUSD_ADDRESS,
    ethers.utils.parseUnits("10", 18)
  );
  console.log("Treasury deposited BUSD");

  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
