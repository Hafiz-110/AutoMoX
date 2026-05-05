const nodemailer = require('nodemailer');

// Configure transporter — uses env variables
// Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in your .env
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Sends a price-drop notification email to a wishlisted user.
 * @param {Object} params
 * @param {string} params.to - recipient email
 * @param {string} params.userName - recipient name
 * @param {Object} params.car - Car document
 * @param {number} params.oldPrice - previous price
 * @param {number} params.newPrice - new lower price
 */
exports.sendPriceDropEmail = async ({ to, userName, car, oldPrice, newPrice }) => {
    const savings = oldPrice - newPrice;
    const savingsPct = ((savings / oldPrice) * 100).toFixed(1);

    const mailOptions = {
        from: `"AutoDealer Alerts" <${process.env.SMTP_USER}>`,
        to,
        subject: `🔥 Price Drop Alert: ${car.year} ${car.make} ${car.model} is now $${newPrice.toLocaleString()}`,
        html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f0f; color: #ffffff; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #c8a951 0%, #e8c96a 100%); padding: 32px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; color: #0f0f0f; font-weight: 900; letter-spacing: -1px;">
              Price Drop Alert 🎯
            </h1>
          </div>
          <div style="padding: 32px;">
            <p style="font-size: 16px; color: #cccccc; margin-top: 0;">Hi ${userName},</p>
            <p style="font-size: 16px; color: #cccccc;">Great news! A car on your wishlist just got cheaper:</p>

            <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 10px; padding: 24px; margin: 24px 0;">
              <h2 style="margin: 0 0 8px; font-size: 22px; color: #e8c96a;">
                ${car.year} ${car.make} ${car.model}
              </h2>
              <p style="margin: 0; color: #888; font-size: 14px;">${car.fuelType} · VIN: ${car.vin}</p>
              <div style="display: flex; gap: 16px; margin-top: 20px; flex-wrap: wrap;">
                <div style="text-align: center; flex: 1;">
                  <div style="font-size: 13px; color: #888; text-decoration: line-through;">Was</div>
                  <div style="font-size: 20px; color: #ff6b6b; font-weight: 700;">$${oldPrice.toLocaleString()}</div>
                </div>
                <div style="text-align: center; flex: 1;">
                  <div style="font-size: 13px; color: #888;">Now</div>
                  <div style="font-size: 28px; color: #4ade80; font-weight: 900;">$${newPrice.toLocaleString()}</div>
                </div>
                <div style="text-align: center; flex: 1;">
                  <div style="font-size: 13px; color: #888;">You Save</div>
                  <div style="font-size: 20px; color: #e8c96a; font-weight: 700;">$${savings.toLocaleString()} (${savingsPct}%)</div>
                </div>
              </div>
            </div>

            <div style="text-align: center; margin-top: 28px;">
              <a href="${process.env.CLIENT_URL}/cars/${car._id}" 
                 style="background: linear-gradient(135deg, #c8a951, #e8c96a); color: #0f0f0f; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 800; font-size: 16px; display: inline-block;">
                View This Car →
              </a>
            </div>

            <p style="color: #555; font-size: 12px; text-align: center; margin-top: 32px;">
              You received this because you wishlisted this vehicle. 
              <a href="${process.env.CLIENT_URL}/wishlist" style="color: #888;">Manage Wishlist</a>
            </p>
          </div>
        </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Price-drop email sent to ${to}`);
    } catch (err) {
        console.error(`❌ Failed to send price-drop email to ${to}:`, err.message);
        // Don't throw — email failure shouldn't break the update flow
    }
};
