const Profit = require('../models/Profit')
const errorHandler=require('../utils/errorHandler')


module.exports.getAll= async function(req, res){   
    try{
        const profits=await Profit.find({user:req.user.id})
            res.status(200).json(profits)
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.getById= async function(req, res){
    try{
        const profit=await Profit.findById(req.params.id)
        res.status(200).json(profit)        
    }catch(e){
        errorHandler(res,e)
    }
}
module.exports.remove=async function(req, res){
    try{
        await Profit.remove({_id:req.params.id})
               res.status(200).json({
            message: 'Позиция дохода была удалена'
        })  
    }catch(e){
        errorHandler(res,e)
    }
}
module.exports.create=async function(req, res){
    const profit= new Profit({
        name: req.body.name,
        amount: req.body.amount,
        user:req.user.id
    })
    try{
        await profit.save()
        console.log(profit)
        res.status(201).json(profit)
    }catch(e){
        errorHandler(res,e)
    }
}
module.exports.update=async function(req, res){
      try{
        const profit=await Profit.findOneAndUpdate(
            { _id:req.params.id },
            {$set:req.body},
            {new: true}
            )
            res.status(200).json(profit)
    }catch(e){
        errorHandler(res,e)
    }
}