const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContractAt("FundMe", deployer)
    console.log("funding contract...")
    const transactionResponse = await fundMe.fund({
        value: ethers.utils.parseEther("0.1"), // 确保使用 ethers.utils
    })
    await transactionResponse.wait(1)
    console.log("funded ")
}

main()
    .then(() => {
        process.exit(0)
    })
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
