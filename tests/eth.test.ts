
import * as eth from "../src/lib/wallets/eth"

describe('testing wallets/eth', () => {
    test('testing eth generate address', () => {
        const mnemonic = "success similar sock water image million upgrade trade dance smooth bicycle motion"
    
        expect( eth.getAddress(mnemonic,0)).toBe('0x1D35fc28C82Fe373fB68bC11f1ac218153CFFB6b')

        const addresses = [
            '0x1D35fc28C82Fe373fB68bC11f1ac218153CFFB6b',
            '0x2E8ACF86863B4262d64B3A9545b166D0D4d9b2D6',
            '0x7AF03be009b69B58159E4e8E3213c159B43E2Ad4',
            '0xCD31e65b61ae60CC8171d01b1c42b4413f45934e',
            '0xAfCc19c4E5B3B6f2175B16A4fEBcFA6c542c5C22'
          ]
        expect(eth.getAddresses(mnemonic, 0, 5)).toEqual(addresses)
        
    });
});

