import * as ecc from 'tiny-secp256k1'
import BIP32Factory from 'bip32'
import * as bip39 from 'bip39'
import * as bitcoin from 'bitcoinjs-lib'

bitcoin.initEccLib(ecc)

const bip32 = BIP32Factory(ecc)

/// UNISAT: PATH: "m/86'/0'/0'/0/INDEX";
const PATH = "m/86'/0'/0'/0"; 

const getAddress = (mnemonic: string, index: number, isTest: boolean): string => {
    var network = bitcoin.networks.bitcoin
    var networkDes = 'bitcoin'
    if (isTest) {
        network = bitcoin.networks.testnet
        networkDes = 'testnet'
    }

    let path = PATH
    const seed = bip39.mnemonicToSeedSync(mnemonic)
    const root = bip32.fromSeed(seed, network)

    const account = root.derivePath(path)
    const node = account.derive(index)
    const childNodeXOnlyPubkey = node.publicKey.subarray(1, 33)

    const p2tr = bitcoin.payments.p2tr({
        internalPubkey: childNodeXOnlyPubkey,
        network: network
    }).address

    return p2tr;
}

const getAddresses = (mnemonic: string, index: number, count: number, isTest: boolean): string[] => {
    let result: string[] = []

    var network = bitcoin.networks.bitcoin
    var networkDes = 'bitcoin'
    if (isTest) {
        network = bitcoin.networks.testnet
        networkDes = 'testnet'
    }

    const seed = bip39.mnemonicToSeedSync(mnemonic)
    const root = bip32.fromSeed(seed, network)

    const account = root.derivePath(PATH)

    for (let i = 0; i < count; i++) {

        const node = account.derive(index + i)
        const childNodeXOnlyPubkey = node.publicKey.subarray(1, 33)

        const p2tr = bitcoin.payments.p2tr({
            internalPubkey: childNodeXOnlyPubkey,
            network: network
        }).address
        result.push(p2tr)

    }
    return result
}


export { getAddress, getAddresses }