

import colors from 'colors'
colors.enable()
import * as ethers from 'ethers'
import * as bip39 from 'bip39'
import * as eth from "../lib/wallets/eth"
import { generateEncryptedMnemonic } from '../lib/mnemonic'


const example = () => {
    const mnemonic = bip39.generateMnemonic()
    console.log('mnemonic:', mnemonic);
    
    // Get MetaMask type address
    console.log(eth.getAddress(mnemonic, 0));
    console.log(eth.getAddresses(mnemonic, 0, 2));

    const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic)
    console.log(wallet.address);
    

    generateEncryptedMnemonic('./wallets1',2)
}

export { example }