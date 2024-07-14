import { useEffect } from 'react';
import PropTypes from 'prop-types';

const PaymentWidget = ({ amount, reference, signature, onSuccess, onError }) => {
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = '/wompi-widget.html';
    iframe.width = '100%';
    iframe.height = '600px';
    iframe.style.border = 'none';

    iframe.onload = () => {
      const script = iframe.contentWindow.document.querySelector('script');
      script.setAttribute('data-amount-in-cents', amount);
      script.setAttribute('data-reference', reference);
      script.setAttribute('data-signature:integrity', signature);
      script.onload = () => {
        console.log('Wompi script loaded');
      };
      script.onerror = () => {
        onError('Failed to load Wompi script');
      };
    };

    document.getElementById('wompi-container').appendChild(iframe);

    return () => {
      document.getElementById('wompi-container').removeChild(iframe);
    };
  }, [amount, reference, signature, onSuccess, onError]);

  return <div id="wompi-container"></div>;
};

PaymentWidget.propTypes = {
  amount: PropTypes.number.isRequired,
  reference: PropTypes.string.isRequired,
  signature: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};

export default PaymentWidget;





