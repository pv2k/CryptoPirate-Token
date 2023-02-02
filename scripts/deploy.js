const hre = require("hardhat");

async function main() {
  const CPToken = await hre.ethers.getContractFactory("CryptoPirateToken");
  const cpToken = await CPToken.deploy();

  await cpToken.deployed();

  console.log(
    `cpToken with 1 ETH deployed to ${cpToken.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
