# ARK Boomerang

A tool thought up by ARK's Justin Renken to easily:
1. Generate multiple wallets
2. Send a specified amount of coins to the generated wallets
3. Send back the coins from the generated wallets to the original sender

This allows you to generate wallets for promotional campaigns (such as giveaways) where the receiving users have to send the coins out of their promotional wallet before a certain date. If they don't complete this "claim", the coins are returned to the promoter.

## Instructions

1. Download and install Node.js Runtime Engine at https://nodejs.org/en/
2. Install Yarn: https://classic.yarnpkg.com/en/docs/install
3. Extract these files to a directory you can access via your cli
4. In your cli, navigate to the directory you extracted the files to.
5. Execute `yarn install` from within that directory.
6. Create an .env file based on `.env.example` and modify it to your desired parameters.
7. Send ARK to the address corresponding to the parameters in the .env. This loads your ARK Boomerang hot wallet address with ARK.
8. Execute `node generate.js` in cli. This will create a new file with the freshly generated addresses.
9. Execute `node send.js` this will distrubute ARK from your ARK Boomerang hot wallet address to the freshly generated addresses.
10. Distribute the freshly generated passphrases to your audience and tell them how long they have left to move the funds.
11. Execute `node claim.js` when time runs out, this will reclaim any unmoved funds back to the ARK Boomerang hot wallet address you specified.
12. Move the reclaimed ARK from your hot wallet address to a secure location until you are ready to use ARK Boomerang again. AND AGAIN.

For additional help using ARK Boomerang, email: justin@ark.io

## Flyer Images

### Front
![](https://github.com/deanpress/ark-boomerang/blob/master/static/Flyer_Front.jpg)

### Back
![](https://github.com/deanpress/ark-boomerang/blob/master/static/Flyer_Back.jpg)


## Disclaimer

This application was created by Dean van Dugteren of [nOS.io](https://nos.io) and Justin Renken of [ARK.io](https://ark.io).

THERE ARE RISKS USING THIS APPLICATION. MISTAKES CAN RESULT IN LOSS OF FUNDS. USE AT YOUR OWN RISK.

IT IS YOUR RESPONSIBILITY TO TAKE PROPER PRECAUTIONS TO KEEP PASSPHRASES AND FUNDS SAFE. DO NOT KEEP FUNDS IN HOT WALLET ADDRESSES OR FRESHLY GENERATED ADDRESSES FOR LONGER THAN NECESSARY.
