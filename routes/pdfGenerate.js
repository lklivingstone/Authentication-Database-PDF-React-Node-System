// const router= require("express").Router()
// const puppeteer= require("puppeteer")


// //REGISTER
// router.post("/", async (req, res)=> {
//     (async ()=> {

//         try {

//             const browser= await puppeteer.launch({
//                 headless: true
//               })

//             const page= await browser.newPage()

//         await page.setContent(`<h2>Name: ${req.body.name}</h1><h2>Number: ${req.body.number}</h2><h2>Token Number: ${req.body.tokenNumber}</h2><h2>Entry Number: ${req.body.entryNumber}</h2>`
//         )

//             const pdfFile= await page.pdf({
//                 path: `${req.body.name}- ${req.body.tokenNumber}.pdf`,
//                 format: "A4",
//                 // printBackground: true
//             })
//             console.log("Done")

//             await browser.close()

//             process.exit()

//             return pdfFile

//         }
//         catch(e) {
//             console.log(e)
//         }
//     })()

//     return res.status(200).json("DONE")
    
// })

// module.exports= router




