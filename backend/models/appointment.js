import mongoose from "mongoose"

const appointmentSchem=new mongoose.Schema({
    userId:{type:String, required:true},
    docId:{type:String, required:true},
    slotDate:{type:String, required:true},
    slotTime:{type:String, required:true},
    userData:{type:String, required:true},
    docData:{type:String, required:true},
    amount:{type:String, required:true},
    date:{type:String, required:true},
    cancelled:{type:Boolean, default:false},
    payment:{type:Boolean,default:false},
    isCompleted:{type:Boolean,default:false}

})

const appointmentModel=mongoose.models.appointment||mongoose.model("appointment",appointmentSchem)
export default appointmentModel