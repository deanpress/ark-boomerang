require("dotenv").config();

const crypto = require("@arkecosystem/crypto");
const fs = require("fs");
const helpers = require("./helpers");

// Load wallets
var wallets = JSON.parse(fs.readFileSync("wallets.json", "utf8"));

// Set network configuration
crypto.Managers.configManager.setFromPreset(process.env.NETWORK);

// Set mainnet milestone for v2 transaction
crypto.Managers.configManager.setHeight(11273000);

async function send() {
  const myWallet = await helpers.getWallet(process.env.PASSPHRASE);
  let nonce = myWallet.nonce;
  // Run for each wallet
  for (const wallet of wallets) {
    let tx;
    nonce++;
    // Generate transfer transaction
    tx = crypto.Transactions.BuilderFactory.transfer()
      // Set network to mainnet id
      .network(23)
      // Set transaction version to 2
      .version(2)
      // Set the wallet nonce
      .nonce(nonce)
      // Set the receiver address
      .recipientId(wallet.address)
      // Add a transaction description
      .vendorField("Boomerang Send")
      // Transaction amount
      .amount(process.env.SEND_AMOUNT)
      // Transaction fee
      .fee(process.env.FEE)
      // Finally, sign the transaction
      .sign(process.env.PASSPHRASE);

    // If SECOND_PASSPHRASE is set for multi-sig, include it in the transaction signing process
    if (process.env.SECOND_PASSPHRASE) {
      tx = tx.secondSign(process.env.SECOND_PASSPHRASE);
    }

    // The struct is the transaction object formatted for API requests
    tx = tx.getStruct();

    await helpers.postTx(tx);
  }
}

// Run send() function
send();
