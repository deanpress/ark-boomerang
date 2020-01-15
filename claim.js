require("dotenv").config({ throwHttpErrors: false });

const crypto = require("@arkecosystem/crypto");
const fs = require("fs");
const got = require("got");

var wallets = JSON.parse(fs.readFileSync("wallets.json", "utf8"));

crypto.Managers.configManager.setFromPreset(process.env.NETWORK);

async function claim() {
  for (const wallet of wallets) {
      console.log(wallet.address);
    const receiver = crypto.Identities.Address.fromPassphrase(
      process.env.PASSPHRASE
    );
    const res = await got.get(process.env.API + "/wallets/" + wallet.address);
    const balance = JSON.parse(res.body).data.balance;
    const amt = crypto.Utils.BigNumber.make(balance)
      .minus(process.env.FEE)
      .toString();
    if (balance) {
      let tx;
      tx = crypto.Transactions.BuilderFactory.transfer()
        .network(23)
        .recipientId(receiver)
        .amount(amt)
        .fee(process.env.FEE)
        .sign(wallet.passphrase)
        .getStruct();
      await postTx(tx);
    }
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

claim();
