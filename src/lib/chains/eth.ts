
import {ChainBaseModel, Chain} from '../models/chain';

const ETHRPC = {
    MainNet: "https://eth.llamarpc.com"
}

const mainRPC = [
    ETHRPC.MainNet,
    'https://eth.llamarpc.com',
    'https://rpc.mevblocker.io'
]

const testRPC = []



const main = new ChainBaseModel(60, 'ETH','Ethereum (Ether)', 1, mainRPC)

const test = new ChainBaseModel(60, 'ETH','Ethereum (Ether)', 1, testRPC)

const ETH = new Chain(main, test)

export { ETH }