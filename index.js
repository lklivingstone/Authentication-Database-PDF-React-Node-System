const express= require("express")
const cors= require("cors")
const mongoose= require("mongoose")
require("dotenv/config")
const app= express()
const cookieParser= require("cookie-parser")
const puppeteer = require("puppeteer");
app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"]
}))

app.use(express.json())

const authRoute= require("./routes/auth")
const entryRoute= require("./routes/entry")
const pdfGenerateRoute= require("./routes/pdfGenerate")

app.use("/api/auth", authRoute)
app.use("/api/entry", entryRoute)
// app.use("/api/pdfgenerate", pdfGenerateRoute)
// app.use("/api/users", userRoute)


app.get("/api/pdf", async (req, res) => {

    // const url = `http://localhost:3000/entry/${req.params.token}`;
    const url= req.query.target
    console.log(url)
    const browser = await puppeteer.launch({
        headless: true
    });
    const webPage = await browser.newPage();
    await webPage.goto(url, {
        waitUntil: "networkidle0"
    });
    
    const pdf = await webPage.pdf({
        printBackground: true,
        format: "Letter",
        margin: {
            top: "20px",
            bottom: "40px",
            left: "20px",
            right: "20px"
        }
    });
    await browser.close();
    res.contentType("application/pdf");
    res.send(pdf);
})



mongoose.set('strictQuery', true);
mongoose.connect(
    process.env.DB_CONNECTION
    ).then(
        () => console.log("Connected to DB")
        ).catch(
            (err)=> {
                console.log(err)
            })


app.listen(process.env.PORT || 5000, ()=> {
    console.log("Listening on port: 5000")
})