
import *  as  solanaWeb3 from '@solana/web3.js'
import { Keypair } from '@solana/web3.js';
import { HDKey } from 'micro-ed25519-hdkey';
import * as bip39 from '@scure/bip39'

const PATH = "m/44'/501'/__INDEX__'/0'";
const INDEX_KEY = "__INDEX__";

const getAddress = (mnemonic: string, index: number): string => {
    const seed = bip39.mnemonicToSeedSync(mnemonic, ""); // (mnemonic, password)
    const hd = HDKey.fromMasterSeed(seed);

    let path = PATH.replace(INDEX_KEY, `${index}`)
    const keypair = Keypair.fromSeed(hd.derive(path).privateKey);
    return keypair.publicKey.toBase58()
}

const getAddresses = (mnemonic: string, index: number, count: number): string[] => {
    const seed = bip39.mnemonicToSeedSync(mnemonic, ""); // (mnemonic, password)
    const hd = HDKey.fromMasterSeed(seed);

    let result: string[] = []
    for (let i = 0; i < count; i++) {
        let path = PATH.replace(INDEX_KEY, `${index + i}`)
        const keypair = Keypair.fromSeed(hd.derive(path).privateKey);
        result.push(keypair.publicKey.toBase58())
    }
    return result
}


export { getAddress, getAddresses }