require("dotenv").config();

const crypto = require("@arkecosystem/crypto");
const fs = require("fs");
const got = require("got");
const helpers = require("./helpers");

// Resolve wallets
var wallets = JSON.parse(fs.readFileSync("wallets.json", "utf8"));

crypto.Managers.configManager.setFromPreset(process.env.NETWORK);

// Set height to the mainnet milestone where aip11 is true (for v2 transactions) 
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
        // Mainnet id is 23
        .network(23)
        // Set transaction version (2)
        .version(2)
        // Nonce must always be latest nonce (retrieved from API) plus 1
        .nonce(nonce + 1)
        // Set receiver arress
        .recipientId(receiver)
        // Set description
        .vendorField("Boomerang Claim")
        // Set amount to send
        .amount(amt)
        // Set transaction fee
        .fee(process.env.FEE)
        // Sign the transaction
        .sign(wallet.passphrase)
        // Get the formatted object to POST to the API
        .getStruct();

      // Post the transaction
      await helpers.postTx(tx);
    }
  }
}


claim();
