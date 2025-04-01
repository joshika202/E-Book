import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Wallet } from 'lucide-react';
import { Book } from '../types';

interface PaymentModalProps {
  book: Book;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaymentModal({ book, onClose, onSuccess }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'wallet'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [walletProvider, setWalletProvider] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Complete Your Purchase</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium">{book.title}</h3>
              <p className="text-sm text-gray-600">by {book.author}</p>
            </div>
            <div className="text-xl font-bold">₹{book.price.toFixed(2)}</div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <h3 className="font-medium mb-2">Select Payment Method</h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-3 border rounded-md flex flex-col items-center justify-center ${
                  paymentMethod === 'card' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
                }`}
              >
                <CreditCard className="h-6 w-6 mb-1" />
                <span className="text-sm">Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 border rounded-md flex flex-col items-center justify-center ${
                  paymentMethod === 'upi' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
                }`}
              >
                <Smartphone className="h-6 w-6 mb-1" />
                <span className="text-sm">UPI</span>
              </button>
              <button
                onClick={() => setPaymentMethod('wallet')}
                className={`p-3 border rounded-md flex flex-col items-center justify-center ${
                  paymentMethod === 'wallet' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
                }`}
              >
                <Wallet className="h-6 w-6 mb-1" />
                <span className="text-sm">Wallet</span>
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="cardExpiry"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cardCvv"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="123"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            
            {paymentMethod === 'upi' && (
              <div>
                <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">
                  UPI ID
                </label>
                <input
                  type="text"
                  id="upiId"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="name@upi"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            )}
            
            {paymentMethod === 'wallet' && (
              <div>
                <label htmlFor="walletProvider" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Wallet
                </label>
                <select
                  id="walletProvider"
                  value={walletProvider}
                  onChange={(e) => setWalletProvider(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select a wallet</option>
                  <option value="paytm">Paytm</option>
                  <option value="phonepe">PhonePe</option>
                  <option value="amazonpay">Amazon Pay</option>
                  <option value="mobikwik">MobiKwik</option>
                </select>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full mt-6 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : `Pay ₹${book.price.toFixed(2)}`}
            </button>
          </form>
          
          <p className="mt-4 text-xs text-gray-500 text-center">
            By completing this purchase, you agree to our Terms of Service and Privacy Policy.
            Your payment information is securely processed.
          </p>
        </div>
      </div>
    </div>
  );
}