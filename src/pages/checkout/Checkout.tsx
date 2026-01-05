import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { SVGS } from "../../constants/home";
import { PaystackButton } from "react-paystack";

interface CheckoutFormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  country: string;
  stateRegion: string;
  address: string;
  city: string;
  postalCode: string;
}

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

interface PaystackConfig {
  reference: string;
  email: string;
  amount: number;
  publicKey: string;
}

type PaymentMethod = 'card' | 'paystack' | 'bank_transfer' | 'ussd';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useCart();
  const [currentStep, setCurrentStep] = useState<
    "INFORMATION" | "SHIPPING" | "PAYMENT"
  >("INFORMATION");
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    country: "",
    stateRegion: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [selectedShipping, setSelectedShipping] = useState<string>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('paystack');
  const [paymentData, setPaymentData] = useState<PaymentFormData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: {
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });



  const shippingOptions: ShippingOption[] = [
    {
      id: "standard",
      name: "Standard Shipping",
      description: "5-7 business days",
      price: 0,
      estimatedDays: "5-7 days",
    },
    {
      id: "express",
      name: "Express Shipping",
      description: "2-3 business days",
      price: 15,
      estimatedDays: "2-3 days",
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      description: "Next business day",
      price: 25,
      estimatedDays: "1 day",
    },
  ];

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentInputChange = (field: string, value: string) => {
    if (field.startsWith('billingAddress.')) {
      const addressField = field.split('.')[1];
      setPaymentData(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [addressField]: value,
        },
      }));
    } else {
      setPaymentData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleShippingClick = () => {
    setCurrentStep("SHIPPING");
  };

  const handlePaymentClick = () => {
    setCurrentStep("PAYMENT");
  };

  const handlePlaceOrder = () => {
    // Handle order placement logic here
    console.log('Order placed:', { formData, selectedShipping, paymentData });
    alert('Order placed successfully!');
  };

  const subtotal: number = state.totalPrice || 0;
  const selectedShippingOption = shippingOptions.find(option => option.id === selectedShipping);
  const shippingCost: number = selectedShippingOption?.price || 0;
  const total: number = subtotal + shippingCost;

  // Paystack configuration
  const paystackConfig: PaystackConfig = {
    reference: new Date().getTime().toString(),
    email: formData.email,
    amount: Math.round(total * 100), // Paystack expects amount in kobo
    publicKey: 'pk_test_your_paystack_public_key_here', // Replace with your actual public key
  };

  // Paystack success and close handlers
  const handlePaystackSuccess = (reference: any) => {
    console.log('Payment successful:', reference);
    alert('Payment successful! Order placed.');
    navigate('/order-confirmation');
  };

  const handlePaystackClose = () => {
    console.log('Payment closed');
  };

  return (
    <div className="  mb-[2rem]  md:pt-25 pt-20">
      {/* Back Button */}
      <div className="fixed top-20 left-7 z-50">
        <button
          onClick={handleBackClick}
          className="p-2 hover:bg-gray-100 hidden md:flex rounded-full transition-colors"
        >
          {SVGS.arrowBack}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="  p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-8">CHECKOUT</h1>

            {/* Progress Steps */}
            <div className="flex items-center mb-8 space-x-8">
              <button
                onClick={() => setCurrentStep("INFORMATION")}
                className={`text-sm font-medium ${
                  currentStep === "INFORMATION"
                    ? "text-black border-b-2 border-black pb-1"
                    : "text-gray-400"
                }`}
              >
                INFORMATION
              </button>
              <button
                onClick={() => setCurrentStep("SHIPPING")}
                className={`text-sm font-medium ${
                  currentStep === "SHIPPING"
                    ? "text-black border-b-2 border-black pb-1"
                    : "text-gray-400"
                }`}
              >
                SHIPPING
              </button>
              <button
                onClick={() => setCurrentStep("PAYMENT")}
                className={`text-sm font-medium ${
                  currentStep === "PAYMENT"
                    ? "text-black border-b-2 border-black pb-1"
                    : "text-gray-400"
                }`}
              >
                PAYMENT
              </button>
            </div>

            {/* Tab Content */}
            {currentStep === "INFORMATION" && (
              <>
                {/* Contact Info Section */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">CONTACT INFO</h2>
                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={e => handleInputChange("email", e.target.value)}
                      className="w-full p-3 border border-gray-500"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={e => handleInputChange("phone", e.target.value)}
                      className="w-full p-3 border outline-none border-gray-500"
                    />
                  </div>
                </div>

                {/* Shipping Address Section */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">SHIPPING ADDRESS</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={e =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="w-full p-3 border outline-0 border-gray-500"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={e =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="w-full p-3 border outline-none border-gray-500"
                      />
                    </div>

                    <select
                      value={formData.country}
                      onChange={e => handleInputChange("country", e.target.value)}
                      className="w-full p-3 border outline-0 border-gray-500"
                    >
                      <option value="">Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>

                    <input
                      type="text"
                      placeholder="State / Region"
                      value={formData.stateRegion}
                      onChange={e =>
                        handleInputChange("stateRegion", e.target.value)
                      }
                      className="w-full p-3 border outline-0 border-gray-500"
                    />

                    <input
                      type="text"
                      placeholder="Address"
                      value={formData.address}
                      onChange={e => handleInputChange("address", e.target.value)}
                      className="w-full p-3 border outline-0 border-gray-500"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={e => handleInputChange("city", e.target.value)}
                        className="w-full p-3 border outline-0 border-gray-500"
                      />
                      <input
                        type="text"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={e =>
                          handleInputChange("postalCode", e.target.value)
                        }
                        className="w-full p-3 border outline-0 border-gray-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Button */}
                <button
                  onClick={handleShippingClick}
                  className="w-full bg-[#d4d4d4] text-black py-4 px-6 flex items-center justify-between font-medium transition-colors"
                >
                  <span>Shipping</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M12 5L19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Shipping Tab Content */}
            {currentStep === "SHIPPING" && (
              <>
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-6">SHIPPING METHOD</h2>
                  <div className="space-y-4">
                    {shippingOptions.map(option => (
                      <div
                        key={option.id}
                        className={`border p-4 cursor-pointer transition-colors ${
                          selectedShipping === option.id
                            ? "border-black bg-gray-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onClick={() => setSelectedShipping(option.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="shipping"
                              value={option.id}
                              checked={selectedShipping === option.id}
                              onChange={() => setSelectedShipping(option.id)}
                              className="w-4 h-4 "
                            />
                            <div>
                              <h3 className="font-medium">{option.name}</h3>
                              <p className="text-sm text-gray-600">
                                {option.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {option.price === 0 ? "Free" : `$${option.price}`}
                            </p>
                            <p className="text-sm text-gray-600">
                              {option.estimatedDays}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handlePaymentClick}
                  disabled={!selectedShipping}
                  className={`w-full py-4 px-6 flex items-center justify-between font-medium transition-colors ${
                    selectedShipping
                      ? "bg-[#d4d4d4] text-black hover:bg-gray-300"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <span>Payment</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M12 5L19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Payment Tab Content */}
            {currentStep === "PAYMENT" && (
              <>
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-6">PAYMENT INFORMATION</h2>
                  
                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <h3 className="text-md font-medium mb-4">Choose Payment Method</h3>
                    <div className="space-y-3">
                      {/* Paystack Option */}
                      <div
                        className={`border p-4 cursor-pointer transition-colors ${
                          selectedPaymentMethod === 'paystack'
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onClick={() => setSelectedPaymentMethod('paystack')}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="paystack"
                              checked={selectedPaymentMethod === 'paystack'}
                              onChange={() => setSelectedPaymentMethod('paystack')}
                              className="w-4 h-4 text-blue-500"
                            />
                            <div>
                              <h4 className="font-medium text-blue-600">Pay with Paystack</h4>
                              <p className="text-sm text-gray-600">Secure payment with cards, bank transfer, USSD</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Recommended</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Option */}
                      <div
                        className={`border p-4 cursor-pointer transition-colors ${
                          selectedPaymentMethod === 'card'
                            ? "border-black bg-gray-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onClick={() => setSelectedPaymentMethod('card')}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={selectedPaymentMethod === 'card'}
                            onChange={() => setSelectedPaymentMethod('card')}
                            className="w-4 h-4"
                          />
                          <div>
                            <h4 className="font-medium">Credit/Debit Card</h4>
                            <p className="text-sm text-gray-600">Visa, Mastercard, Verve</p>
                          </div>
                        </div>
                      </div>

                      {/* Bank Transfer Option */}
                      <div
                        className={`border p-4 cursor-pointer transition-colors ${
                          selectedPaymentMethod === 'bank_transfer'
                            ? "border-black bg-gray-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onClick={() => setSelectedPaymentMethod('bank_transfer')}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="bank_transfer"
                            checked={selectedPaymentMethod === 'bank_transfer'}
                            onChange={() => setSelectedPaymentMethod('bank_transfer')}
                            className="w-4 h-4"
                          />
                          <div>
                            <h4 className="font-medium">Bank Transfer</h4>
                            <p className="text-sm text-gray-600">Direct bank transfer</p>
                          </div>
                        </div>
                      </div>

                      {/* USSD Option */}
                      <div
                        className={`border p-4 cursor-pointer transition-colors ${
                          selectedPaymentMethod === 'ussd'
                            ? "border-black bg-gray-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onClick={() => setSelectedPaymentMethod('ussd')}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="ussd"
                            checked={selectedPaymentMethod === 'ussd'}
                            onChange={() => setSelectedPaymentMethod('ussd')}
                            className="w-4 h-4"
                          />
                          <div>
                            <h4 className="font-medium">USSD</h4>
                            <p className="text-sm text-gray-600">Pay with your mobile banking USSD code</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Conditional Card Information Form */}
                  {selectedPaymentMethod === 'card' && (
                    <div className="mb-6">
                      <h3 className="text-md font-medium mb-4">Card Information</h3>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Card Number"
                          value={paymentData.cardNumber}
                          onChange={e => handlePaymentInputChange("cardNumber", e.target.value)}
                          className="w-full p-3 border outline-0 border-gray-500"
                          maxLength={19}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={paymentData.expiryDate}
                            onChange={e => handlePaymentInputChange("expiryDate", e.target.value)}
                            className="w-full p-3 border outline-0 border-gray-500"
                            maxLength={5}
                          />
                        <input
                          type="text"
                          placeholder="CVV"
                          value={paymentData.cvv}
                          onChange={e => handlePaymentInputChange("cvv", e.target.value)}
                          className="w-full p-3 border outline-0 border-gray-500"
                          maxLength={4}
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        value={paymentData.cardholderName}
                        onChange={e => handlePaymentInputChange("cardholderName", e.target.value)}
                        className="w-full p-3 border outline-0 border-gray-500"
                      />
                    </div>

                    {/* Billing Address for Card */}
                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-4">Billing Address</h4>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Address"
                          value={paymentData.billingAddress.address}
                          onChange={e => handlePaymentInputChange("billingAddress.address", e.target.value)}
                          className="w-full p-3 border outline-0 border-gray-500"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="City"
                            value={paymentData.billingAddress.city}
                            onChange={e => handlePaymentInputChange("billingAddress.city", e.target.value)}
                            className="w-full p-3 border outline-0 border-gray-500"
                          />
                          <input
                            type="text"
                            placeholder="State"
                            value={paymentData.billingAddress.state}
                            onChange={e => handlePaymentInputChange("billingAddress.state", e.target.value)}
                            className="w-full p-3 border outline-0 border-gray-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Postal Code"
                            value={paymentData.billingAddress.postalCode}
                            onChange={e => handlePaymentInputChange("billingAddress.postalCode", e.target.value)}
                            className="w-full p-3 border outline-0 border-gray-500"
                          />
                          <select
                            value={paymentData.billingAddress.country}
                            onChange={e => handlePaymentInputChange("billingAddress.country", e.target.value)}
                            className="w-full p-3 border outline-0 border-gray-500"
                          >
                            <option value="">Country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="AU">Australia</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  )}
                </div>

                {/* Payment Action Buttons */}
                <div className="space-y-4">
                  {selectedPaymentMethod === 'paystack' && (
                    <PaystackButton
                      {...paystackConfig}
                      text="Pay with Paystack"
                      onSuccess={handlePaystackSuccess}
                      onClose={handlePaystackClose}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 font-medium transition-colors rounded"
                    />
                  )}
                  
                  {selectedPaymentMethod === 'card' && (
                    <button
                      onClick={handlePlaceOrder}
                      className="w-full bg-black text-white py-4 px-6 font-medium transition-colors hover:bg-gray-800"
                    >
                      PLACE ORDER
                    </button>
                  )}
                  
                  {selectedPaymentMethod === 'bank_transfer' && (
                    <div className="text-center p-6 bg-gray-50 rounded">
                      <h4 className="font-medium mb-2">Bank Transfer Details</h4>
                      <p className="text-sm text-gray-600 mb-4">Transfer the total amount to the account below:</p>
                      <div className="text-sm space-y-1">
                        <p><strong>Bank:</strong> Example Bank</p>
                        <p><strong>Account Name:</strong> Your Store Name</p>
                        <p><strong>Account Number:</strong> 1234567890</p>
                        <p><strong>Amount:</strong> ${Number(total).toFixed(2)}</p>
                      </div>
                      <button
                        onClick={handlePlaceOrder}
                        className="w-full mt-4 bg-black text-white py-3 px-6 font-medium transition-colors hover:bg-gray-800"
                      >
                        I HAVE MADE THE TRANSFER
                      </button>
                    </div>
                  )}
                  
                  {selectedPaymentMethod === 'ussd' && (
                    <div className="text-center p-6 bg-gray-50 rounded">
                      <h4 className="font-medium mb-2">USSD Payment</h4>
                      <p className="text-sm text-gray-600 mb-4">Dial the USSD code for your bank:</p>
                      <div className="text-sm space-y-2 mb-4">
                        <p><strong>GTBank:</strong> *737*Amount*Account#</p>
                        <p><strong>Access Bank:</strong> *901*Amount*Account#</p>
                        <p><strong>First Bank:</strong> *894*Amount*Account#</p>
                        <p><strong>Amount:</strong> ${Number(total).toFixed(2)}</p>
                      </div>
                      <button
                        onClick={handlePlaceOrder}
                        className="w-full bg-black text-white py-3 px-6 font-medium transition-colors hover:bg-gray-800"
                      >
                        I HAVE COMPLETED PAYMENT
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className=" border md:h-[500px] border-gray-300 p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">YOUR ORDER</h2>
              <span className="text-sm text-gray-500">
                ({state.totalItems})
              </span>
            </div>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {state.items.map(item => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex items-center space-x-4"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.subtitle}</p>
                    <p className="text-sm text-gray-600">
                      {item.color}/{item.size}
                    </p>
                  </div>
                  <div className="text-right">
                    <button className="text-sm text-gray-500 hover:text-black mb-1">
                      Change
                    </button>
                    <p className="text-sm">({item.quantity})</p>
                    <p className="font-medium">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-300 pt-4  space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${Number(subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0
                    ? "Free"
                    : `$${Number(shippingCost).toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between mt-4 font-semibold text-lg border-t border-gray-300 pt-2">
                <span>Total</span>
                <span>${Number(total).toFixed(2)}</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
