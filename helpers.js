require("dotenv").config();
const got = require("got");

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

module.exports = {
    postTx
};