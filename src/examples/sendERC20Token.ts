

import colors from 'colors'
colors.enable()
import { ethers } from 'ethers'
import * as bip39 from 'bip39'
import * as eth from "../lib/wallets/eth"
import { generateEncryptedMnemonic } from '../lib/mnemonic'

import { Merlin as MerlinChain } from '../lib/chains/merlin'
import { Merlin as MerlinTokens } from '../lib/models/erc20Token'

import { XToken, XWallet } from '../lib/contract/erc20'


const ETH_example = () => {
    
}

const Merlin_example = async () => {
    const provider = new ethers.JsonRpcProvider(MerlinChain.mainNet.rpc);

    const mnemonic = bip39.generateMnemonic()
    const pair = eth.getWallet(mnemonic, 0)

    const wallet = new XWallet(pair, provider)
    const balance = await wallet.getBalance()
    console.log(balance);
    

    // await wallet.sendDefault('0x', '1')

    const mp_address = '0xcfc3c5338edd9f9f5ce2b7ca65fdf339afdd656b'// Merlin main net active address

    const MPToken = new XToken(MerlinTokens.MP,provider)
    await MPToken.balanceOf(mp_address)
    // const MPTokenInfo = await MPToken.getTokenDetails()
    // console.log(MPTokenInfo);
    

    const RUFIToken = new XToken(MerlinTokens.RUFI,provider)
    await RUFIToken.balanceOf(mp_address)
    // const RUFITokenInfo = await RUFIToken.getTokenDetails()
    // console.log(RUFITokenInfo);

    const USDT = new XToken(MerlinTokens.M_USDT, null, wallet.wallet)
    await USDT.balanceOf(mp_address)
    // USDT.connect(wallet.wallet)
    // const USDTInfo = await USDT.getTokenDetails()
    // console.log(USDTInfo);

    //
    const tx = await USDT.transfer(mp_address, '0.03')
    console.log(tx);
    
}

export { ETH_example, Merlin_example }