const Razorpay = require('razorpay')
const crypto = require('crypto');
const PaymentModel = require('../models/payment-model')

const razorpay = new Razorpay({
    key_id: 'rzp_test_pXHbFRxt8rR1Ig',
    key_secret: 'rHjWKac3vtSx3ZZJr7lPxu6i',
});

const createOrder = async (req, res) => {

    const {price, email} = req.body

    const options = {
        amount: price * 100, // Amount in paise (e.g., 50000 paise = INR 500)
        currency: 'INR',
        receipt: `order_rcptid_${Date.now()}`,
    };
    

    try {
        const order = await razorpay.orders.create(options);
        await PaymentModel.create({email: email, price: price})
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
};

const verifyPayment = async(req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const key_secret = 'rHjWKac3vtSx3ZZJr7lPxu6i';

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', key_secret)
                                    .update(body.toString())
                                    .digest('hex');

    if (expectedSignature === razorpay_signature) {
        res.json({ status: 'Payment verified successfully' });
    } else {
        res.status(400).send({ status: 'Payment verification failed' });
    }
}

module.exports = { createOrder, verifyPayment };