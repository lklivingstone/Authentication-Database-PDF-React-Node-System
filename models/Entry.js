const mongoose= require("mongoose")

const EntrySchema= new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        number: {
            type: Number,
            required: true
        },

        tokenNumber: {
            type: Number,
        },

        entryNumber: {
            type: Number,
        },

        date: {
            type: String,
            required: true,
        },
    },
    {

        timestamps: true
    }
)

module.exports= mongoose.model("Entry", EntrySchema)