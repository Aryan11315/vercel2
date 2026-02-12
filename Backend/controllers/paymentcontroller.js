const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RZP_KEY_ID,
  key_secret: process.env.RZP_KEY_SECRET,
});

// Create order
exports.createOrder = async (req, res, next) => {
  try {
    const { amount, currency = "INR" } = req.body;
    if (!amount) return res.status(400).json({ error: "Amount required (in paise)." });

    const options = {
      amount,
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        merchant_note: "Payment to My Company",
      },
    };

    const order = await razorpay.orders.create(options);
    res.json({ order, keyId: process.env.RZP_KEY_ID });
  } catch (err) {
    next(err); // pass error to middleware
  }
};

// Verify payment
exports.verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const secret = process.env.RZP_KEY_SECRET;

  const generated_signature = crypto
    .createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    return res.json({ ok: true });
  } else {
    return res.status(400).json({ ok: false, error: "invalid_signature" });
  }
};
