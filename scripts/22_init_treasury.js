const { ethers } = require("hardhat");
const {
  ZERO_ADDRESS,
  BUSD_ADDRESS,
  WBNB_ADDRESS,
  LARGE_APPROVAL,
} = require("../utils/bsctest/constants");
const address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();

  const Treasury = await ethers.getContractFactory("NowDaoTreasury");
  const treasury = await Treasury.attach(address.Treasury);
  console.log("Treasury address:", treasury.address);

  await treasury.queue("0", deployer.address);
  console.log("Queue deployer reserve depositor");
  await treasury.queue("0", address.BusdBond);
  console.log("Queue BUSD bond reserve depositor");
  await treasury.queue("2", WBNB_ADDRESS);
  console.log("Queue WBNB reserve token");
  await treasury.queue("4", deployer.address);
  console.log("Queue liquidity depositor");
  await treasury.queue("4", address.NmetaBusdBond);
  console.log("Queue NMETA-BUSD bond liquidity depositor");
  await treasury.queue("4", address.NmetaBnbBond);
  console.log("Queue NMETA-BNB bond liquidity depositor");
  await treasury.queue("5", address.NmetaBusd);
  console.log("Queue Nmeta-Busd");
  await treasury.queue("5", address.NmetaBnb);
  console.log("Queue Nmeta-Bnb");
  await treasury.queue("8", address.Distributor);
  console.log("Queue Distributor reward manager");
  await treasury.queue("8", address.BnbBond);
  console.log("Queue BNB bond reward manager");
  await treasury.queue("9", address.NUSD);
  console.log("Queue NUSD token");

  await treasury.toggle("0", deployer.address, ZERO_ADDRESS);
  console.log("Toggle deployer reserve depositor");
  await treasury.toggle("0", address.BusdBond, ZERO_ADDRESS);
  console.log("Toggle BUSD bond reserve depositor");
  await treasury.toggle("2", WBNB_ADDRESS, ZERO_ADDRESS);
  console.log("Toggle WBNB reserve token");
  await treasury.toggle("4", deployer.address, ZERO_ADDRESS);
  console.log("Toggle liquidity depositor");
  await treasury.toggle("4", address.NmetaBusdBond, ZERO_ADDRESS);
  console.log("Toggle NMETA-BUSD bond liquidity depositor");
  await treasury.toggle("4", address.NmetaBnbBond, ZERO_ADDRESS);
  console.log("Toggle NMETA-BNB bond liquidity depositor");
  await treasury.toggle("5", address.NmetaBusd, address.Calculator);
  console.log("Toggle Nmeta-Busd");
  await treasury.toggle("5", address.NmetaBnb, address.Calculator);
  console.log("Toggle Nmeta-Bnb");
  await treasury.toggle("8", address.Distributor, ZERO_ADDRESS);
  console.log("Toggle Distributor reward manager");
  await treasury.toggle("8", address.BnbBond, ZERO_ADDRESS);
  console.log("Toggle BNB bond reward manager");
  await treasury.toggle("9", address.NUSD, ZERO_ADDRESS);
  console.log("Toggle NUSD token");

  const Busd = await ethers.getContractFactory("BEP20Token");
  const busd = await Busd.attach(BUSD_ADDRESS);
  console.log("BUSD address:", busd.address);

  await busd.approve(address.Treasury, LARGE_APPROVAL);
  console.log("Approved the treasury to spend BUSD");

  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
