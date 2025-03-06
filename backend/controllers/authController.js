import axios from 'axios';
import bcrypt from 'bcryptjs';

import { generateServiceToken } from "../middlewares/gatewayTokenGenerator.js"

export const getAccountsFromAdmin = async (req,res) => {
    try {
        const serviceToken = generateServiceToken();
        const response = await axios.get(`${process.env.API_GATEWAY_URL}/admin/get-accounts`, {
            headers: { Authorization: `Bearer ${serviceToken}` }
        });
        
        console.log(response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(`Error in getting accounts:${error.message}`);
        res.status(500).json({ message: "Internal Server error" });
    }
}