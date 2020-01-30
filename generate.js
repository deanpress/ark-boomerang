require("dotenv").config();
const bip = require("bip39");
const crypto = require("@arkecosystem/crypto");
const fs = require("fs");

crypto.Managers.configManager.setFromPreset(process.env.NETWORK);

// Generate mnmonic using a network pubkeyhash
function createWallet(pubKeyHash = 23) {
  const passphrase = bip.generateMnemonic();
  const keys = crypto.Identities.Keys.fromPassphrase(passphrase);

  // Address is generated from publicKey + pubKeyHash
  return {
    address: crypto.Identities.Address.fromPublicKey(
      keys.publicKey,
      pubKeyHash
    ),
    passphrase,
    keys
  };
}

// On start: generate wallets
let wallets = [];
for (let i = 0; i < process.env.WALLETS; i++) {
  const wallet = createWallet();
  wallets.push(wallet);
}

// Write all wallets to wallets.json
fs.writeFile("wallets.json", JSON.stringify(wallets), "utf8", function(err) {
  if(err) console.log(err);
});

console.log("Finished");
