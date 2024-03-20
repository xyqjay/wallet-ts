import * as ecc from 'tiny-secp256k1'
import BIP32Factory from 'bip32'
import * as bip39 from 'bip39'
import * as bitcoin from 'bitcoinjs-lib'

bitcoin.initEccLib(ecc)
const bip32 = BIP32Factory(ecc)

const PATH = "m/84'/0'/0'/0";


const getAddress = (mnemonic: string, index: number, isTest: boolean) : string => {
    var network = bitcoin.networks.bitcoin
    var networkDes = 'bitcoin'
    if (isTest) {
        network = bitcoin.networks.testnet
        networkDes = 'testnet'
    }

    const seed =  bip39.mnemonicToSeedSync(mnemonic)
    const root =  bip32.fromSeed(seed,network)

    const account = root.derivePath(PATH)
    const node = account.derive(index)

    const p2wpkh = bitcoin.payments.p2wpkh({
        pubkey: node.publicKey,
        network: network
    }).address

    return p2wpkh
}

const getAddresses = (mnemonic: string, index: number, count: number, isTest: boolean) : string[] => {
    
    var network = bitcoin.networks.bitcoin
    var networkDes = 'bitcoin'
    if (isTest) {
        network = bitcoin.networks.testnet
        networkDes = 'testnet'
    }

    const seed =  bip39.mnemonicToSeedSync(mnemonic)
    const root =  bip32.fromSeed(seed,network)
    const account = root.derivePath(PATH)

    let result: string[] = []

    for (let i = 0; i < count; i ++) {
        const node = account.derive(index + i)

        const p2wpkh = bitcoin.payments.p2wpkh({
            pubkey: node.publicKey,
            network: network
        }).address

        result.push(p2wpkh)
    }    
    
    return result
}


export { getAddress, getAddresses }