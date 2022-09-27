const { ethers } = require("hardhat");
const {
  BOND_BCV,
  MIN_BOND_PRICE,
  MAX_BOND_PAYOUT,
  MAX_BOND_DEBT,
  INITIAL_BOND_DEBT,
  BOND_VESTING_LENGTH,
} = require("../utils/bsctest/constants");
const address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();

  const BnbBond = await ethers.getContractFactory("NowDaoBnbBondDepository");
  const bnbBond = await BnbBond.attach(address.BnbBond);
  console.log("BnbBond address:", bnbBond.address);

  await bnbBond.initializeBondTerms(
    BOND_BCV,
    MIN_BOND_PRICE,
    MAX_BOND_PAYOUT,
    MAX_BOND_DEBT,
    INITIAL_BOND_DEBT,
    BOND_VESTING_LENGTH
  );
  console.log("Set BNB bond terms");

  await bnbBond.setStaking(address.Staking, 0);
  console.log("Set Staking for BNB bond");

  await bnbBond.setStaking(address.Helper, 1);
  console.log("Set StakingHelper for BNB bond");

  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
