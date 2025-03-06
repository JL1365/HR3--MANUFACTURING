import mongoose from "mongoose";

const incentiveSchema = new mongoose.Schema({
    incentiveName:{
        type:String,
        required:true,
        unique:true
    },
    incentiveType:{
        type:String,
        required:true
    },
    incentiveDescription:{
        type:String,
        required:false
    }
},{timestamps:true});

export const Incentive = mongoose.model("Incentive",incentiveSchema);