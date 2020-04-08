const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const orderSchema = new Schema ({
    date:{
        type: Date,
        required: true,
        unique:true
    },
    order:{
        type: String,
        required: true
    },
    list:{
        type: this.listenerCount
    },
    user:{
        ref:'users',
        type: Schema.Types.ObjectId
    }
})

module.exports=mongoose.model('order', orderSchema)