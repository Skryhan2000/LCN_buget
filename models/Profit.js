const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const profitSchema = new Schema ({
    name:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required:true
    },
    user:{
        ref:'users',
        type: Schema.Types.ObjectId
    }
})

module.exports=mongoose.model('profits', profitSchema)