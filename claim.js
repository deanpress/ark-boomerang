require("dotenv").config();

const crypto = require("@arkecosystem/crypto");
const fs = require("fs");
const got = require("got");
const helpers = require("./helpers");

// Resolve wallets
var wallets = JSON.parse(fs.readFileSync("wallets.json", "utf8"));

crypto.Managers.configManager.setFromPreset(process.env.NETWORK);
crypto.Managers.configManager.setHeight(11273000);

async function claim() {
  
  // Run for all wallets
  for (const wallet of wallets) {
    console.log(wallet.address);

    // Send coins from generated wallets back to this address
    const receiver = crypto.Identities.Address.fromPassphrase(
      process.env.PASSPHRASE
    );

    // Call API for balance
    const res = await got.get(process.env.API + "/wallets/" + wallet.address);
    const balance = JSON.parse(res.body).data.balance;
    const nonce = Number(JSON.parse(res.body).data.nonce);
    const amt = crypto.Utils.BigNumber.make(balance)
      .minus(process.env.FEE)
      .toString();

    // If there's still a balance on the wallet, send back the wallet's entire balance
    if (balance) {
      let tx;
      tx = crypto.Transactions.BuilderFactory.transfer()
        .network(23)
        .version(2)
        .nonce(nonce + 1)
        .recipientId(receiver)
        .vendorField("Boomerang Claim")
        .amount(amt)
        .fee(process.env.FEE)
        .sign(wallet.passphrase)
        .getStruct();
      await helpers.postTx(tx);
    }
  }
}


claim();
