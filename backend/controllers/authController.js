import axios from 'axios';
import bcrypt from 'bcryptjs';

import { generateServiceToken } from "../middlewares/gatewayTokenGenerator.js"
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

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

export const login = async (req,res) => {
    try {
        const { email, password } = req.body;
    
        const serviceToken = generateServiceToken();
    
        const response = await axios.get(`${process.env.API_GATEWAY_URL}/admin/get-accounts`, {
            headers: { Authorization: `Bearer ${serviceToken}` }
        });
    
        const users = response.data;
        const user = users.find((u) => u.email === email);
    
        if (!user) {
          return res.status(400).json({ message: "Invalid email or password" });
        }
    
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateTokenAndSetCookie(res, user);
        
        return res.status(200).json({ token, user });
      } catch (err) {
        console.error("Error during login:", err.message);
        return res.status(500).json({ message: "Server error" });
      }
}

export const checkAuth = (req, res) => {
  try {
    
    if (!req.user) {
        return res.status(401).json({ message: "User not authenticated!" });
    }

    res.status(200).json({ message: "User is authenticated!", user: req.user });

  } catch (error) {

    console.log(`Error in checking auth: ${error.message}`);
    return res.status(500).json({message:"Internal server error!"});
  }
};

export const logout = async (req,res) => {
    try {
        if(!req.cookies.token){
            return res.status(400).json({message:"You are not log in"})
        }

        res.clearCookie("token",{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return res.status(200).json({ success: true, message: "Logged out successfully"});

    } catch (error) {
        console.error(`Error during logout : ${error.message}`);
        return res.status(500).json({message: "Internal server error!" });
    }
}