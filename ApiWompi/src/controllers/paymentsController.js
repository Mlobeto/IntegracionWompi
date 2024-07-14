// controllers/paymentController.js
const crypto = require('crypto');

// Generar referencia de pago y firma
const generatePaymentReferenceAndSignature = (amount, publicKey, privateKey) => {
    const reference = `ORDER_${Date.now()}`;
    const signature = crypto.createHmac('sha256', privateKey)
                            .update(`${reference}${amount}${publicKey}`)
                            .digest('hex');
    return { reference, signature };
};

// Webhook para recibir notificaciones de Wompi
const handleWompiWebhook = (req, res) => {
    const { event, data } = req.body;
    if (event === 'transaction.updated') {
        const transaction = data.transaction;
        // Actualizar el estado del pago en la base de datos
        // Aquí debes agregar tu lógica para manejar el estado del pago
    }
    res.sendStatus(200);
};

module.exports = {
    generatePaymentReferenceAndSignature,
    handleWompiWebhook
};

