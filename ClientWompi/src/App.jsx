import { useState } from 'react';
import PaymentWidget from './components/paymentWidget';

const App = () => {
  const [paymentData, setPaymentData] = useState(null);

  const handlePayment = async () => {
    const response = await fetch('https://tu-backend.com/api/payments/generate-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: 10000 })
    });
    const data = await response.json();
    setPaymentData(data);
  };

  return (
    <div>
      <button onClick={handlePayment}>Pagar</button>
      {paymentData && (
        <PaymentWidget
          amount={10000}
          reference={paymentData.reference}
          signature={paymentData.signature}
          onSuccess={() => alert('Pago exitoso')}
          onError={() => alert('Error en el pago')}
        />
      )}
    </div>
  );
};

export default App;


