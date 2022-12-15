const router= require("express").Router()
const User= require("../models/User")
const CryptoJS= require("crypto-js")
require("dotenv/config")
const jwt= require("jsonwebtoken")


//REGISTER
router.post("/register", async (req, res)=> {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_KEY).toString(),
        isAdmin: req.body.isAdmin || false
    })

    try{
        const savedUser= await newUser.save()
        const {password, ...others }= savedUser._doc
        res.status(200).json(others)
    }catch(err) {
        res.status(500).json(err)
    }
})

router.post("/login", async (req, res) => {
    try{
        const user= await User.findOne({email: req.body.email})
        if (!user) {
            res.status(401).json("wrong credentials")
        }
        else {
            const OriginalPassword= CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8)

            if (OriginalPassword!==req.body.password) {
                res.status(401).json("wrong credentials")
            }
            else {

                const accessToken= jwt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin
                }, process.env.JWT_KEY, { expiresIn: "5h"})
                const { password, ...other }= user._doc
                res.status(200).json({...other, accessToken})
            }
        }
    }catch(err) {
        res.status(500).json(err)
    }
})

// router.post("/login", async (req, res) => {
//     try{
//         const user= await User.findOne({email: req.body.email})
//         if (!user) {
//             res.status(401).json("User Not Found")
//         }
//         else {
//             const OriginalPassword= CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8)

//             if (OriginalPassword!==req.body.password) {
//                 res.status(401).json("wrong credentials")
//             }
//             else {
//                 const accessToken= jwt.sign({
//                     id: user._id,
//                     isAdmin: user.isAdmin
//                 }, process.env.JWT_KEY, { expiresIn: "24h"})
//                 // const { password, ...other }= user._doc
//                 res.status(200).cookie("jwt", accessToken, {
//                     httpOnly: true,
//                     maxAge: 24*60*60*1000
//                 }).json("Success")
//             }
//         }
//     }catch(err) {
//         res.status(500).json(err)
//     }
// })

// router.get("/user", async (req, res) => {
//     try {
//         const cookie= req.cookies['jwt']

//         const decrypt= jwt.verify(cookie, process.env.JWT_KEY)

//         if (!decrypt) {
//             return res.status(401).json("Unauthenticated")
//         }
    
//         const foundUser= await User.findOne({id: decrypt._id, isAdmin: decrypt.isAdmin})
//         const {password, ...others }= foundUser._doc
//         res.status(200).json(others)
//     }
//     catch(err) {
//         res.status(401).send(error)
//     }
// })

// router.post("/logout", async (req, res) => {
//     try{
//         res.cookie("jwt", "", {maxAge: 0})

//         res.status(200).json("Success")
//     }catch(err) {
//         res.status(500).json(err)
//     }
// })

module.exports= router