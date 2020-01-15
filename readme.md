# ARK Boomerang

## Instructions

1. Download and install Node.js Runtime Engine at https://nodejs.org/en/
2. Extract these files to a directory you can access via your cli
3. In your cli, navigate to the directory you extracted the files to.
4. Execute `npm install` from within that directory.
5. Create an .env file based on `.env.example` and modify it to your desired parameters.
6. Send ARK to the address corresponding to the parameters in the .env. This loads your ARK Boomerang hot wallet address with ARK.
7. Execute `node generate.js` in cli. This will create a new file with the freshly generated addresses.
8. Execute `node send.js` this will distrubute ARK from your ARK Boomerang hot wallet address to the freshly generated addresses.
9. Distribute the freshly generated passphrases to your audience and tell them how long they have left to move the funds.
10. Execute `node claim.js` when time runs out, this will reclaim any unmoved funds back to the ARK Boomerang hot wallet address you specified.
11. Move the reclaimed ARK from your hot wallet address to a secure location until you are ready to use ARK Boomerang again.ANG AGAIN.

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
