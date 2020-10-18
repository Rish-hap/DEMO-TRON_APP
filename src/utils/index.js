const contractAddress = 'TUCoofUyrZ2kVWW3K1TV9jbsCUpKX8rhD5'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },
};

export default utils;