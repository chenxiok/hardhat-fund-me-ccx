// // import
// // main function
// // calling of main function
// // function deployFund() {
// //     console.log("hi")
// // }
// // module.exports.default = deployFund
// // module.exports = async (hre) => {
// //     const { getNamedAccounts, deployments } = hre
// // }

// const { network } = require("hardhat")
// const { networkConfig, developmentChains } = require("../helper-hardhat-config")
// const { verify } = require("../utils/verify")
// // 语法糖    // 这种写法是我只需要在函数声明里直接使用这两个变量即可
// module.exports = async ({ getNamedAccounts, deployments }) => {
//     const { deploy, log } = deployments
//     const { deployer } = await getNamedAccounts()
//     const chainId = network.config.chainId
//     const address = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"

//     // const ethUsdPriceFeedAddress =
//     //     networkConfig[chainId][ethUsdPriceFeedAddress] // 取字典里的值的方式
//     // 当我们使用本地主机或者“Hardhat Network时吗，我们要使用mock
//     // 确保 chainId 存在于 networkConfig 中
//     if (!networkConfig[chainId]) {
//         throw new Error(
//             `Network configuration for chainId ${chainId} not found`
//         )
//     }
//     let ethUsdPriceFeedAddress
//     if (developmentChains.includes(network.name)) {
//         const ethUsdAggregator = await deployments.get("MockV3Aggregator")
//         ethUsdPriceFeedAddress = ethUsdAggregator.address
//     } else {
//         // ethUsdPriceFeedAddress = networkConfig[chainId][ethUsdPriceFeedAddress]
//         ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"] // 修正此行
//     }
//     const args = [ethUsdPriceFeedAddress]
//     const fundMe = await deploy("FundMe", {
//         from: deployer,
//         args: args, // put price feed address
//         log: true,
//     })
//     if (!developmentChains.includes(network.name)) {
//         // verify
//         await verify(fundMe.address, args)
//     }
//     log("------------------------------------")
// }
// module.exports.tags = ["all", "fundme"]

const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const mockAggregator = await get("MockV3Aggregator")
        ethUsdPriceFeedAddress = mockAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, // 将价格预言机地址传递给构造函数
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args)
    }

    log("----------------------------------------------------")
}

module.exports.tags = ["all", "fundme"]
