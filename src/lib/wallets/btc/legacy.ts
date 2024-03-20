import * as ecc from 'tiny-secp256k1'
import BIP32Factory from 'bip32'
import * as bip39 from 'bip39'
import * as bitcoin from 'bitcoinjs-lib'

bitcoin.initEccLib(ecc)
const bip32 = BIP32Factory(ecc)

const PATH = "m/44'/0'/0'/0";


const getAddress = (mnemonic: string, index: number, isTest: boolean): string => {
    var network = bitcoin.networks.bitcoin
    var networkDes = 'bitcoin'
    if (isTest) {
        network = bitcoin.networks.testnet
        networkDes = 'testnet'
    }

    const seed = bip39.mnemonicToSeedSync(mnemonic)
    const root = bip32.fromSeed(seed, network)

    const account = root.derivePath(PATH)
    const node = account.derive(index)

    const p2pkh = bitcoin.payments.p2pkh({
        pubkey: node.publicKey,
        network: network
    }).address

    return p2pkh
}

const getAddresses = (mnemonic: string, index: number, count: number, isTest: boolean): string[] => {
    var network = bitcoin.networks.bitcoin
    var networkDes = 'bitcoin'
    if (isTest) {
        network = bitcoin.networks.testnet
        networkDes = 'testnet'
    }

    const seed = bip39.mnemonicToSeedSync(mnemonic)
    const root = bip32.fromSeed(seed, network)

    const account = root.derivePath(PATH)

    let result: string[] = []
    for (let i = 0; i < count; i++) {
        const node = account.derive(index + i)

        const p2pkh = bitcoin.payments.p2pkh({
            pubkey: node.publicKey,
            network: network
        }).address

        result.push(p2pkh)
    }
    return result
}


export { getAddress, getAddresses }