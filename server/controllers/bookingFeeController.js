const SSLCommerzPayment = require("sslcommerz-lts");
const { v4: uuidv4 }   = require("uuid");
const BookingFee        = require("../models/BookingFee");
const Car               = require("../models/Car");

const IS_LIVE = process.env.NODE_ENV === "production";
const BOOKING_AMOUNT = 10000;

exports.initiatePayment = async (req, res) => {
  try {
    const { carId } = req.body;
    const customer  = req.user;

    const car = await Car.findById(carId);
    if (!car)
      return res.status(404).json({ message: "Car not found." });
    if (car.stockStatus !== "Available")
      return res.status(400).json({ message: "Car is no longer available." });

    const tran_id = uuidv4();

    await BookingFee.create({
      customerId:    customer._id,
      carId:         car._id,
      amount:        BOOKING_AMOUNT,
      transactionId: tran_id,
      status:        "pending",
    });

    const sslData = {
      total_amount:  BOOKING_AMOUNT,
      currency:      "BDT",
      tran_id,
      success_url:   `${process.env.SERVER_URL}/api/payment/success`,
      fail_url:      `${process.env.SERVER_URL}/api/payment/fail`,
      cancel_url:    `${process.env.SERVER_URL}/api/payment/cancel`,
      cus_name:      customer.name,
      cus_email:     customer.email,
      cus_phone:     customer.phone || "N/A",
      cus_add1:      "Dhaka",
      cus_city:      "Dhaka",
      cus_country:   "Bangladesh",
      cus_postcode:  "1000",
      product_name:  `Booking Fee — ${car.make} ${car.model} ${car.year}`,
      product_category: "Automotive",
      product_profile:  "general",
      ship_name:     customer.name,
      ship_add1:     "Dhaka",
      ship_city:     "Dhaka",
      ship_country:  "Bangladesh",
      ship_postcode: "1000",
    };

    const sslcz = new SSLCommerzPayment(
      process.env.SSLCOMMERZ_STORE_ID,
      process.env.SSLCOMMERZ_STORE_PASSWORD,
      IS_LIVE
    );

    const apiResponse = await sslcz.init(sslData);

    if (apiResponse?.GatewayPageURL) {
      await BookingFee.findOneAndUpdate(
        { transactionId: tran_id },
        { sslSessionKey: apiResponse.sessionkey }
      );
      return res.json({ url: apiResponse.GatewayPageURL });
    } else {
      return res.status(502).json({ message: "Could not reach payment gateway." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment initiation failed.", error: err.message });
  }
};

exports.paymentSuccess = async (req, res) => {
  try {
    const { tran_id, val_id } = req.body;

    const sslcz = new SSLCommerzPayment(
      process.env.SSLCOMMERZ_STORE_ID,
      process.env.SSLCOMMERZ_STORE_PASSWORD,
      IS_LIVE
    );
    const validationResponse = await sslcz.validate({ val_id });

    if (
      validationResponse?.status === "VALID" ||
      validationResponse?.status === "VALIDATED"
    ) {
      const booking = await BookingFee.findOneAndUpdate(
        { transactionId: tran_id },
        {
          status:        "paid",
          sslResponse:   req.body,
          reservedUntil: new Date(Date.now() + 48 * 60 * 60 * 1000),
        },
        { new: true }
      );

      await Car.findByIdAndUpdate(booking.carId, { stockStatus: "Reserved" });

      return res.redirect(
        `${process.env.CLIENT_URL}/booking/success?tran_id=${tran_id}`
      );
    } else {
      return res.redirect(
        `${process.env.CLIENT_URL}/booking/fail?reason=validation_failed`
      );
    }
  } catch (err) {
    console.error(err);
    res.redirect(`${process.env.CLIENT_URL}/booking/fail?reason=server_error`);
  }
};

exports.paymentFail = async (req, res) => {
  const { tran_id } = req.body;
  await BookingFee.findOneAndUpdate(
    { transactionId: tran_id },
    { status: "failed", sslResponse: req.body }
  );
  res.redirect(`${process.env.CLIENT_URL}/booking/fail?tran_id=${tran_id}`);
};

exports.paymentCancel = async (req, res) => {
  const { tran_id } = req.body;
  await BookingFee.findOneAndUpdate(
    { transactionId: tran_id },
    { status: "cancelled", sslResponse: req.body }
  );
  res.redirect(`${process.env.CLIENT_URL}/booking/cancel?tran_id=${tran_id}`);
};

exports.getPaymentStatus = async (req, res) => {
  try {
    const booking = await BookingFee.findOne({
      transactionId: req.params.tranId,
      customerId:    req.user._id,
    }).populate("carId", "make model year");

    if (!booking)
      return res.status(404).json({ message: "Booking not found." });

    return res.json({
      status:        booking.status,
      amount:        booking.amount,
      reservedUntil: booking.reservedUntil,
      car:           booking.carId,
      transactionId: booking.transactionId,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};