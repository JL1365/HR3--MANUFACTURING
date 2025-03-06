import mongoose from "mongoose";

const benefitSchema = new mongoose.Schema({
    benefitName:{
        type:String,
        required:true,
        unique:true
    },
    benefitType:{
        type:String,
        required:true
    },
    benefitDescription:{
        type:String,
        required:false
    }
},{timestamps:true});

export const Benefit = mongoose.model("Benefit",benefitSchema);