const router= require("express").Router()
const Entry= require("../models/Entry")
const Counter= require("../models/Counter")
const { verifyToken }= require("./verifyToken")

//POST ENTRY
router.post("/", (req, res) => {

    
    Counter.findOneAndUpdate(
        {
            id: "counter"
        },
        {
            "$inc": {
                "sequence": 1
            }
        },
        {
            new: true
        },
        (err, resp)=> {
            let sequenceId;
            if (resp==null) {
                const newValue= new Counter({
                    id: "counter",
                    sequence: 1
                })
                newValue.save()
                sequenceId= 1
            }
            else {
                sequenceId= resp.sequence
            }

            const entry= new Entry({
                name:  req.body.name ,
                number: req.body.number ,
                tokenNumber: sequenceId+10000 ,
                entryNumber: sequenceId ,
            })
        
                const newEntry= entry.save()
                res.status(200).json(newEntry)
        }
    )

    // const entry= new Entry({
    //     username:  req.body.username ,
    //     name: req.body.name ,
    //     tokenNumber: req.body.tokenNumber ,
    //     entryNumber: req.body.entryNumber ,
    // })

    // try {
    //     const newEntry= await entry.save()
    //     res.status(200).json(newEntry)
    // }
    // catch (err) {
    //     res.status(500).json(err)
    // }
})

//GET ALL ENTRY
router.get("/", async (req, res) => {
    try{
        const foundEntries= await Entry.find()

        res.status(200).json(foundEntries)
    }
    catch(err) {
        res.status(500).json(err)
    }
})

router.get("/find/:tokenNumber", async (req, res) => {
    try{
        const foundEntries= await Entry.findOne({tokenNumber: req.params.tokenNumber})

        res.status(200).json(foundEntries)
    }
    catch(err) {
        res.status(500).json(err)
    }
})

module.exports= router