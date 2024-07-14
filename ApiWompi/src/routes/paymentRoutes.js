const express = require('express');
const router = express.Router();
const { generatePaymentReferenceAndSignature, handleWompiWebhook } = require('../controllers/paymentController');

router.post('/generate-payment', (req, res) => {
    const { amount } = req.body;
    const publicKey = process.env.WOMPI_PUBLIC_KEY;
    const privateKey = process.env.WOMPI_PRIVATE_KEY;
    const { reference, signature } = generatePaymentReferenceAndSignature(amount, publicKey, privateKey);
    res.json({ reference, signature });
});

router.post('/webhook', handleWompiWebhook);

module.exports = router;

