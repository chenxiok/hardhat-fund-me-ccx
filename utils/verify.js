// const { run } = require("hardhat")

// async function verify(contractAddress, args) {
//     console.log("Verifying contract...")
//     try {
//         await run("verify:verify", {
//             address: contractAddress,
//             constructorArguments: args,
//         })
//         console.log("Verification successful!")
//     } catch (e) {
//         if (e.message.toLowerCase().includes("already verified")) {
//             console.log("Already Verified!")
//         } else {
//             // console.log(e)
//             console.error("Verification failed:", e.message)
//             console.error("Full error:", e)
//         }
//     }
// }

// module.exports = { verify }

const { run } = require("hardhat")

async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
        console.log("Verification successful!")
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.error("Verification failed:", e.message)
            console.error("Full error:", e)
        }
    }
}

module.exports = { verify }
