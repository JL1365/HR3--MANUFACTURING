import mongoose from "mongoose";

import { Benefit } from "../models/benefit/benefitModel.js";

export const createBenefit = async (req,res) => {
    try {
        const {benefitName,benefitType,benefitDescription} = req.body;

        const isBenefitExist = await Benefit.findOne({benefitName});
        if(isBenefitExist){
            return res.status(400).json({message:"Benefit already exists"})
        }

        const newBenefit = new Benefit({
            benefitName,
            benefitType,
            benefitDescription           
        });

        await newBenefit.save();
        res.status(201).json({message:"Benefit created successfully!",data: newBenefit})
    } catch (error) {
        console.log(`Error in creating benefit: ${error.message}`)
        return res.status(500).json({message:"Internal server error!"});
    }
};

export const getAllBenefits = async (req,res) => {
    try {
        const allBenefits = await Benefit.find({});
        if(allBenefits.length === 0) {
            return res.status(404).json({message:"Benefit Not found"});
        }
        res.status(200).json({message:"Benefits fetch successfully!", data:allBenefits});
    } catch (error) {
        console.log(`Error in fetching benefit: ${error.message}`)
        return res.status(500).json({message:"Internal server error!"});
    }
}

export const updateBenefit = async (req, res) => {
    try {
        const { id } = req.params;
        const { benefitName, benefitDescription, benefitType} = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({message: "Invalid benefit ID format." });
        }

        const existingBenefit = await Benefit.findById(id);
        if (!existingBenefit) {
            return res.status(404).json({message: "Benefit not found." });
        }

        if (existingBenefit.benefitName !== benefitName) {
            const nameExists = await Benefit.findOne({ benefitName });
            if (nameExists) {
                return res.status(400).json({message: "Benefit name already exists." });
            }
        }

        const updatedBenefit = await Benefit.findByIdAndUpdate(
            id,
            { benefitName, benefitDescription, benefitType },
            { new: true }
        );

        res.status(200).json({ message: "Updating benefit successful!",data:updatedBenefit });
    } catch (error) {
        console.log(`Error in updating benefit: ${error.message}`);
        return res.status(500).json({ message: "Internal server error!" });
    }
};

export const deleteBenefit = async (req,res) => {
    try {
        const {id} = req.params;
        const benefitExist = await Benefit.findById(id);
        if(!benefitExist){
            return res.status(404).json({message:"Benefit not found"});
        }
        const deletedBenefit = await Benefit.findByIdAndDelete(id);
        res.status(200).json({message:"Benefit deleted successfully!",deletedBenefit});  
    } catch (error) {
        console.log(`Error in deleting benefit: ${error.message}`);
        return res.status(500).json({ message: "Internal server error!" });
    }
}