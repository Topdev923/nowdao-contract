const { ethers } = require("hardhat");
const {
  BOND_BCV,
  MIN_BOND_PRICE,
  MAX_BOND_PAYOUT,
  BOND_FEE,
  MAX_BOND_DEBT,
  INITIAL_BOND_DEBT,
  BOND_VESTING_LENGTH,
} = require("../utils/bsctest/constants");
const address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();

  const BusdBond = await ethers.getContractFactory("NowDaoBondDepository");
  const busdBond = await BusdBond.attach(address.BusdBond);
  console.log("BusdBond address:", busdBond.address);

  await busdBond.initializeBondTerms(
    BOND_BCV,
    MIN_BOND_PRICE,
    MAX_BOND_PAYOUT,
    BOND_FEE,
    MAX_BOND_DEBT,
    INITIAL_BOND_DEBT,
    BOND_VESTING_LENGTH
  );
  console.log("Set BUSD bond terms");

  await busdBond.setStaking(address.Staking, 0);
  console.log('Set Staking for BUSD bond');

  await busdBond.setStaking(address.Helper, 1);
  console.log('Set StakingHelper for BUSD bond');

  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
