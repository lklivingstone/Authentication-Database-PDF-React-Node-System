const mongoose= require("mongoose")

const CounterSchema= new mongoose.Schema(
    {
        id: {
            type: String,
        },

        sequence: {
            type: Number,
            
        }
    },
)

module.exports= mongoose.model("Counter", CounterSchema)