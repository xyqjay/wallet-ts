

import colors from 'colors'
colors.enable()
import * as ethers from 'ethers'
import * as bip39 from 'bip39'


import * as eth from "../lib/wallets/eth"
import * as sol from "../lib/wallets/sol"

import * as taproot from '../lib/wallets/btc/taproot'
import * as nestive from '../lib/wallets/btc/NestiveSegwit'
import * as nested from '../lib/wallets/btc/NestedSegwit'
import * as legacy from '../lib/wallets/btc/legacy'

import path from 'path'


const example = () => {
    const mnemonic = bip39.generateMnemonic()
    console.log('mnemonic:', mnemonic);
    
    // Get MetaMask type address
    console.log(eth.getAddress(mnemonic, 0));
    console.log(eth.getAddresses(mnemonic, 0, 2));


    console.log(sol.getAddress(mnemonic, 0));
    console.log(sol.getAddresses(mnemonic, 0, 2));


    console.log(taproot.getAddress(mnemonic, 0, false));
    console.log(taproot.getAddresses(mnemonic, 0, 2, false));

    console.log(nestive.getAddress(mnemonic, 0, false));
    console.log(nestive.getAddresses(mnemonic, 0, 2, false));

    console.log(nested.getAddress(mnemonic, 0, false));
    console.log(nested.getAddresses(mnemonic, 0, 2, false));

    console.log(legacy.getAddress(mnemonic, 0, false));
    console.log(legacy.getAddresses(mnemonic, 0, 2, false));
}

export { example }