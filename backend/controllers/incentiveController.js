import mongoose from "mongoose";

import { Incentive } from "../models/incentive/incentiveModel.js";

export const createIncentive = async (req,res) => {
    try {
        const {incentiveName,incentiveType,incentiveDescription} = req.body;

        const isIncentiveExist = await Incentive.findOne({incentiveName});
        if(isIncentiveExist){
            return res.status(400).json({message:"Incentive already exists"})
        }

        const newIncentive = new Incentive({
            incentiveName,
            incentiveType,
            incentiveDescription           
        });

        await newIncentive.save();
        res.status(201).json({message:"Incentive created successfully!",data: newIncentive})
    } catch (error) {
        console.log(`Error in creating Incentive: ${error.message}`)
        return res.status(500).json({message:"Internal server error!"});
    }
};

export const getAllIncentives = async (req,res) => {
    try {
        const allIncentives = await Incentive.find({});
        if(allIncentives.length === 0) {
            return res.status(404).json({message:"Incentive Not found"});
        }
        res.status(200).json({message:"Incentives fetch successfully!", data:allIncentives});
    } catch (error) {
        console.log(`Error in fetching Incentive: ${error.message}`)
        return res.status(500).json({message:"Internal server error!"});
    }
}

export const updateIncentive = async (req, res) => {
    try {
        const { id } = req.params;
        const { incentiveName, incentiveDescription, incentiveType} = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({message: "Invalid Incentive ID format." });
        }

        const Incentive = await Incentive.findById(id);
        if (!Incentive) {
            return res.status(404).json({message: "Incentive not found." });
        }

        if (Incentive.incentiveName !== incentiveName) {
            const nameExists = await Incentive.findOne({ incentiveName });
            if (nameExists) {
                return res.status(400).json({message: "Incentive name already exists." });
            }
        }

        const updatedIncentive = await Incentive.findByIdAndUpdate(
            id,
            { incentiveName, incentiveDescription, incentiveType },
            { new: true }
        );

        res.status(200).json({ message: "Updating Incentive successful!", data:updatedIncentive });
    } catch (error) {
        console.log(`Error in updating incentive: ${error.message}`);
        return res.status(500).json({ message: "Internal server error!" });
    }
};

export const deleteIncentive = async (req,res) => {
    try {
        const {id} = req.params;
        const incentiveExist = await Incentive.findById(id);
        if(!incentiveExist){
            return res.status(404).json({message:"Incentive not found"});
        }
        const deletedIncentive = await Incentive.findByIdAndDelete(id);
        res.status(200).json({message:"Incentive deleted successfully!",deletedIncentive});  
    } catch (error) {
        console.log(`Error in deleting Incentive: ${error.message}`);
        return res.status(500).json({ message: "Internal server error!" });
    }
}