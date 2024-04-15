class Chain {
    mainNet: ChainBaseModel
    testNet: ChainBaseModel

    public constructor(mainNet: ChainBaseModel, testNet: ChainBaseModel) {
        this.mainNet = mainNet
        this.testNet = testNet
    }
}

class ChainBaseModel {
    /// Path component (coin_type') SLIP-0044 : Registered coin types for BIP-0044
    // https://github.com/satoshilabs/slips/blob/master/slip-0044.md
    coin_type: number;
    symbol: string;
    name: string;
    chainID: number;
    rpces: string[];
    explorer?: string;

    public constructor(coin_type: number, 
        symbol: string,
        name: string,
        chainID: number,
        rpces: string[],
        explorer?: string) {
        this.coin_type = coin_type;
        this.symbol = symbol;
        this.name = name;
        this.chainID = chainID;
        this.rpces = rpces;
        this.explorer = explorer;
    }

    public get coin(): string {
        return this.name;
    }

    public get rpc(): string {
        return this.rpces[0]
    }
}
export { ChainBaseModel , Chain}