require("dotenv").config({ throwHttpErrors: false });

const crypto = require("@arkecosystem/crypto");
const fs = require("fs");
const got = require("got");

var wallets = JSON.parse(fs.readFileSync("wallets.json", "utf8"));

crypto.Managers.configManager.setFromPreset(process.env.NETWORK);

async function send() {
  for (const wallet of wallets) {
    let tx;
    tx = crypto.Transactions.BuilderFactory.transfer()
      .network(23)
      .recipientId(wallet.address)
      .amount(process.env.SEND_AMOUNT)
      .fee(process.env.FEE)
      .sign(process.env.PASSPHRASE);
    if (process.env.SECOND_PASSPHRASE) {
      tx = tx.secondSign(process.env.SECOND_PASSPHRASE);
    }

    tx = tx.getStruct();
    await postTx(tx);
  }
}

async function postTx(tx) {
  const res = await got.post(process.env.API + "/transactions", {
    json: { transactions: [tx] },
    throwHttpErrors: false
  });

  const json = JSON.parse(res.body);

  if (res.statusCode === 200 && Object.keys(json.data.accept).length) {
    console.log(
      `Transaction success: ${tx.id} ( ${tx.amount} from ${tx.senderPublicKey} to ${tx.recipientId} )`
    );
  } else {
    console.log(
      `Transaction failed:  ${tx.id} ( ${tx.amount} from ${tx.senderPublicKey} to ${tx.recipientId} )`
    );
    console.log(json.errors);
  }
}

send();