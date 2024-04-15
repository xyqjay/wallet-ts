

import { ethers } from 'ethers';
import { ERC20Model, erc20Abi } from '../models/erc20ABI';

const WETH_ABI = [
    "function balanceOf(address) public view returns(uint)",
    "function deposit() public payable",
    "function transfer(address, uint) public returns (bool)",
    "function withdraw(uint) public",
];

class XToken {
    contract: ethers.Contract
    model?: ERC20Model

    constructor(address: string, provider?: ethers.Provider, wallet?: ethers.HDNodeWallet) {
        this.contract = new ethers.Contract(address, erc20Abi, provider ?? wallet)
    }

    /**
     * connect
     */
    // public connect(wallet: ethers.HDNodeWallet) {
    //     this.contract = this.contract.connect(wallet)
    // }

    // Get Token Information
    public async getTokenDetails() {
        const name = await this.contract.name();
        const symbol = await this.contract.symbol();
        const decimals = await this.contract.decimals();
        const totalSupply = await this.contract.totalSupply();

        this.model = new ERC20Model(name, symbol, decimals, totalSupply)

        return {
            name,
            symbol,
            decimals,
            totalSupply: totalSupply.toString()
        };
    }

    /**
     * balanceOf
     */
    public async balanceOf(address: string) : Promise<bigint> {
        if (!this.model) {
            await this.getTokenDetails()
        }
        const balance = await this.contract.balanceOf(address)        
        console.log(`address:${address} ${this.model.symbol} (${this.model.name}) Balance: ${ethers.formatUnits(balance, this.model.decimals)} ${this.model.symbol}`)
        return balance
    }

    public async transfer(toAddress:string, amount: string) {
        if (!this.model) {
            await this.getTokenDetails()
        }

        const tx = await this.contract.transfer(toAddress, ethers.parseUnits(amount, this.model.decimals))

        await tx.wait()
        return tx
    }
}

class XWallet {
    wallet: ethers.HDNodeWallet;
    constructor(wallet: ethers.HDNodeWallet, provider: ethers.Provider) {
        // this.wallet = wallet
        this.wallet = wallet.connect(provider)
    }
    /**
     * getBalance
     */
    public async getBalance(): Promise<bigint> {
        const balance = await this.wallet.provider.getBalance(this.wallet.address)
        return balance
    }
    /**
     * sendDefault(toAddress: string, amount: string)
     */
    public async sendDefault(toAddress: string, amount: string): Promise<ethers.TransactionResponse> {
        const tx = {
            to: toAddress,
            value: ethers.parseEther(amount)
        }

        // Send the transaction and get a receipt
        const receipt = await this.wallet.sendTransaction(tx)
        await receipt.wait() // Waiting for on-chain confirmation of transactions
        // console.log(receipt) // Print Transaction Details
        return receipt
    }
}

export { XWallet, XToken }