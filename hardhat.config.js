// require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("hardhat-gas-reporter")
require("@nomicfoundation/hardhat-ethers")
require("dotenv").config()
const { INFURA_PROJECT_ID, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const SEPOLIA_KEY = process.env.SEPOLIA_KEY
module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.8",
            },
            {
                version: "0.6.6",
            },
        ],
    },
    // defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: [PRIVATE_KEY],
            chainId: 11155111, // 添加 chainId
        },
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        token: "MATIC",
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1337: 1,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
        timeout: 200000, // 设置超时时间为200秒
    },
}
