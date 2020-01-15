require("dotenv").config();
const bip = require("bip39");
const crypto = require("@arkecosystem/crypto");
const fs = require("fs");

crypto.Managers.configManager.setFromPreset(process.env.NETWORK);

function createWallet(pubKeyHash = 23) {
  const passphrase = bip.generateMnemonic();
  const keys = crypto.Identities.Keys.fromPassphrase(passphrase);

  return {
    address: crypto.Identities.Address.fromPublicKey(
      keys.publicKey,
      pubKeyHash
    ),
    passphrase,
    keys
  };
}

let wallets = [];
for (let i = 0; i < process.env.WALLETS; i++) {
  const wallet = createWallet();
  wallets.push(wallet);
}

fs.writeFile("wallets.json", JSON.stringify(wallets), "utf8", function(err) {
  console.log(err);
});

console.log("Finished");
