import { ethers } from "hardhat";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";

async function main() {
  console.log("deploying");
  const Push = await ethers.getContractFactory("Push");

  const contract = await Push.deploy();

  await contract.waitForDeployment();
  console.log("Contract deployed to : ", contract.target);

  const userAlice = await PushAPI.initialize(signer, {
    env: CONSTANTS.ENV.STAGING,
  });
}
main()
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
