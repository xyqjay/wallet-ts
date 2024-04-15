import {ChainBaseModel, Chain} from '../models/chain';


const mainRPC = [
    'https://rpc.merlinchain.io',
]

const testRPC = ['https://testnet-rpc.merlinchain.io']

const main = new ChainBaseModel(-1, 'BTC','Merlin Mainnet', 4200, mainRPC, 'https://scan.merlinchain.io')

const test = new ChainBaseModel(-1, 'BTC','Merlin Testnet', 686868, testRPC, 'https://testnet-scan.merlinchain.io')

const Merlin = new Chain(main, test)

export { Merlin }