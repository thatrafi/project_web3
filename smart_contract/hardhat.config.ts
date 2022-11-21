// https://eth-goerli.g.alchemy.com/v2/_-wSTmVfS5RriMJMbvx5AlLSof78iCsy

require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/_-wSTmVfS5RriMJMbvx5AlLSof78iCsy",
      accounts: [
        "0cbf5b53f9309059868bab13b60c14cbd7d8e3f3a6b8cc3024f64be305cb248c",
      ],
    },
  },
};
