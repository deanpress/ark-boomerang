require("dotenv").config();

const crypto = require("@arkecosystem/crypto");
const fs = require("fs");
const helpers = require("./helpers");

// Load wallets
var wallets = JSON.parse(fs.readFileSync("wallets.json", "utf8"));

// Set network configuration
crypto.Managers.configManager.setFromPreset(process.env.NETWORK);

async function send() {
  
  // Run for each wallet
  for (const wallet of wallets) {
    let tx;

    // Generate transfer transaction
    tx = crypto.Transactions.BuilderFactory.transfer()
      .network(23)
      .recipientId(wallet.address)
      .amount(process.env.SEND_AMOUNT)
      .fee(process.env.FEE)
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
