import mongoose from "mongoose"

const appointmentSchem=new mongoose.Schema({
    userId:{type:String, required:true},
    docId:{type:String, required:true},
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  userData: { type: Object, required: true }, // Changed from String
  docData: { type: Object, required: true }, // Changed from String
  amount: { type: Number, required: true },   // Changed from String
  date: { type: Date, default: Date.now },
    cancelled:{type:Boolean, default:false},
    payment:{type:Boolean,default:false},
    isCompleted:{type:Boolean,default:false}

})

const appointmentModel=mongoose.models.appointment||mongoose.model("appointment",appointmentSchem)
export default appointmentModel