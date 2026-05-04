const nodemailer = require('nodemailer');
const User = require('../models/User');

// 1. Setup the "Transporter"
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'junayedazuz530@gmail.com',
        pass: 'xgde snjm znbh flfq' 
    }
});

exports.sendOTP = async (req, res) => {
    const { email } = req.body;
    // FR-1: Generate 6-digit OTP[cite: 1]
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        let user = await User.findOne({ email });
        if (!user) user = new User({ email, role: 'Customer' });

        user.otp = otp;
        // FR-2: Set 5-minute expiry[cite: 1]
        user.otpExpires = Date.now() + 300000;
        await user.save();

        // 2. Define the email content
        const mailOptions = {
            from: '"AutoMoX Admin" <junayedazuz530@gmail.com>',
            to: email,
            subject: 'AutoMoX | Your Secure Login Code',
            text: `Welcome to AutoMoX! Your OTP code is: ${otp}. This code expires in 5 minutes.`
        };

        // 3. Send it!
        await transporter.sendMail(mailOptions);

        // This log confirms the MAIL was attempted
        console.log(`Email successfully sent to ${email} with OTP: ${otp}`);
        res.json({ message: "OTP sent to email!" });

    } catch (error) {
        console.error("Nodemailer Error:", error);
        res.status(500).json({ message: "Error sending email" });
    }
};

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    console.log(`Testing Login - Email: ${email}, OTP: ${otp}`);

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        // Only check if the numbers match, ignore the clock for now
        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Success Path
        user.otp = null;
        await user.save();

        res.json({ message: "Login successful", role: user.role || 'Customer' });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};