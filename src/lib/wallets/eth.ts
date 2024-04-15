import * as ethers from 'ethers'
import { HDNodeWallet, Wallet } from 'ethers';
const readline = require('readline-sync')

const PATH = "m/44'/60'/0'/0/INDEX";
const INDEX_KEY = "INDEX";

const getAddress = (mnemonic: string, index: number): string => {
    let path = PATH.replace(INDEX_KEY, `${index}`)
    const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, '', path)
    return wallet.address
}

const getAddresses = (mnemonic: string, index: number, count: number): string[] => {
    let result: string[] = []
    for (let i = 0; i < count; i++) {
        let path = PATH.replace(INDEX_KEY, `${index + i}`)
        const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, '', path)
        result.push(wallet.address)
    }
    return result
}

const getWalletFromEncryptedJsonSync = (json: string): HDNodeWallet | Wallet => {
    const pwd = readline.question('Please Input Password:', { hideEchoBack: true })

    const wallet = ethers.Wallet.fromEncryptedJsonSync(json, pwd);

    return wallet
}

const getMnemonicFromEncryptedJsonSync = (json: string): string => {
    const pwd = readline.question('Please Input Password:', { hideEchoBack: true })

    const wallet = ethers.Wallet.fromEncryptedJsonSync(json, pwd) as HDNodeWallet;

    return wallet.mnemonic.phrase
}

const getWallet = (mnemonic: string, index: number): HDNodeWallet => {
    let path = PATH.replace(INDEX_KEY, `${index}`)
    const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, '', path)
    return wallet
}

const getWalletes = (mnemonic: string, index: number, count: number): HDNodeWallet[] => {
    let result: HDNodeWallet[] = []
    for (let i = 0; i < count; i++) {
        let path = PATH.replace(INDEX_KEY, `${index + i}`)
        const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, '', path)
        result.push(wallet)
    }
    return result
}

export { getAddress, getAddresses, getWalletFromEncryptedJsonSync, getMnemonicFromEncryptedJsonSync, getWallet, getWalletes }