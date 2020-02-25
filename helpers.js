require("dotenv").config();
const got = require("got");
const crypto = require("@arkecosystem/crypto");

const postTx = async (tx) => {

    //  POST transaction to API endpoint
    const res = await got.post(process.env.API + "/transactions", {
        json: { transactions: [tx] },
        throwHttpErrors: false
    });

    // Parse result body as JSON
    const json = JSON.parse(res.body);

    // Log success/error
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

const getWallet = async (passphrase) => {
    // Get API wallet data (most importantly the nonce & balance) from passphrase
    try {
        address = crypto.Identities.Address.fromPassphrase(passphrase);
        const res = await got(
            `${process.env.API}/wallets/${address}`
        ).json();

        return res.data;

    } catch (e) {
        throw new Error(e);
    }
}

module.exports = {
    postTx,
    getWallet
};