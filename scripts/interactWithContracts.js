// This approach would work if I had the contracts artifacts in my project code base
 
const hre = require("hardhat");
const erc20Addr = "0xf4739A07ABA94B4E1bc77269c2d3949B2397Df6e";
const tokenName = "OznerSirk";

const bucketAddr = "0x873289a1aD6Cf024B927bd13bd183B264d274c68";
const contractName = "Bucket";

const provider = new ethers.providers.AlchemyProvider(
  'goerli',
  process.env.API_KEY
);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function main() {
  const erc20 = await hre.ethers.getContractAt(tokenName, erc20Addr);
  const contract = await hre.ethers.getContractAt(contractName, bucketAddr);

  await erc20.connect(wallet).approve(bucketAddr, 10);

  const tx = await contract.connect(wallet).drop(erc20Addr, 10);

  // Was the tx successful? Check the transaction receipt!
  // if it was, it will be in both the logs and events array. 
  // In this case we should emit Winner()
  const receipt = await tx.wait();
  console.log(receipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
