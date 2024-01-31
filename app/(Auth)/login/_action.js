"use server"

import connectMongoDB from "@/libs/mongodb";
import Joi from "joi";
import User from "@/models/user";
import Token from "@/models/token";
import bcrypt from "bcrypt";
import sendEmail from "@/libs/utils/sendEmail";
import crypto from "crypto";

export const AuthenticateUser = async (prevState, data) => {
    const email = data.get('email');
    const password = data.get('password');
    await connectMongoDB();
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return {message: "Invalid Email or Password", status: 400}
        }
        if (!user.verified) {
            let token = await Token.findOne({ userId: user._id });
            if (!token) {
              const tokenValue = crypto.randomBytes(32).toString("hex");
              token = await new Token({ userId: user._id, token: tokenValue }).save();
              const url = `${process.env.NEXT_PUBLIC_BASE_URL}/users/${user._id}/verify/${tokenValue}`;
              await sendEmail(user.email, "Verify Email", url);
            }
            return {message: "Verification link sent to your email verify your Account first", status: 201}
        }
        const { username, email: userEmail, _id, image, balance } = user;
        const stringifiedId = _id.toString();
        const bUser = { username, email: userEmail, _id: stringifiedId, image, balance };    
        return {user: bUser, message: "Logged in successfully", status: 202}
    } catch (error) {
        return {message: "Internal Server Error", status: 500}
    }
}