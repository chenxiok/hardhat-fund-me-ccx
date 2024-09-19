// const networkConfig = {
//     11155111: {
//         name: "sepolia",
//         ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306", // 添加 sepolia 的地址
//     },
// }
// const developmentChains = ["hardhat", "localhost"]
// const DECIMALS = 8

// const INITIAL_ANSWER = 200000000000
// module.exports = {
//     networkConfig,
//     developmentChains,
//     DECIMALS,
//     INITIAL_ANSWER,
// }
const networkConfig = {
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306", // 添加 sepolia 的地址
    },
    31337: {
        name: "localhost",
        ethUsdPriceFeed: "", // 本地网络将使用 MockV3Aggregator，所以这里留空或添加注释
    },
}
const developmentChains = ["hardhat", "localhost"]
const DECIMALS = 8
const INITIAL_ANSWER = 200000000000 // 2000 * 1e8

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
}
