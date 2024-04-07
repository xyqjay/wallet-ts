import * as ethers from 'ethers'

const PATH = "m/44'/60'/0'/0/INDEX";
const INDEX_KEY = "INDEX";

const getAddress = (mnemonic: string, index: number) : string => {
    let path = PATH.replace(INDEX_KEY,`${index}`)
    const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, '', path)    
    return wallet.address
}

const getAddresses = (mnemonic: string, index: number, count: number) : string[] => {
    let result: string[] = []
    for (let i = 0; i < count; i ++) {
        let path = PATH.replace(INDEX_KEY,`${index+i}`)
        const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, '', path)
        result.push(wallet.address)
    }    
    return result
}


export { getAddress, getAddresses }