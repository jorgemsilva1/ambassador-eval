import React from 'react';

interface PaymentSuccessProps {
  onClose: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ onClose }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Payment Successful</h2>
      <p className="mb-4 text-green-500">
        Your payment has been successfully processed!
      </p>
      <div className="flex justify-center">
        <button
          onClick={onClose}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
