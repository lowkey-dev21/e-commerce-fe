import { useState } from "react";
import Button from "../../components/ui/Button";
import { useCart } from "../../contexts/CartContext";

const Cart = () => {
  const { state, removeItem, updateQuantity } = useCart();
  const [activeTab, setActiveTab] = useState<"bag" | "favourites">("bag");

  const cartItems = state.items;
  const subtotal = state.totalPrice;
  const shipping = cartItems.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen  pt-20">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header Tabs */}
        <div className="flex space-x-8 mb-6 border-b">
          <button
            onClick={() => setActiveTab("bag")}
            className={`text-sm font-medium pb-3 border-b-2 transition-colors ${
              activeTab === "bag"
                ? "text-black border-black"
                : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
          >
            SHOPPING BAG
          </button>
          <button
            onClick={() => setActiveTab("favourites")}
            className={`text-sm font-medium pb-3 border-b-2 transition-colors ${
              activeTab === "favourites"
                ? "text-black border-black"
                : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
          >
            FAVOURITES
          </button>
        </div>

        {activeTab === "bag" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-3 space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    Your shopping bag is empty
                  </p>
                </div>
              ) : (
                cartItems.map((item, i) => (
                  <div key={i} className="bg-[#d4d4d4]/40 p-4 relative">
                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-4 right-4  hover:text-gray-600 z-10"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-32 h-40 object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-medium text-sm mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {item.subtitle}
                          </p>
                          <p className="text-lg font-medium mb-4">
                            $ {item.price}
                          </p>
                        </div>

                        <div className="space-y-4">
                          {/* Size Selector */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              {item.size}
                            </span>
                            <div className="w-8 h-8 bg-black"></div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-gray-300">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="w-8 h-8 flex items-center justify-center text-sm font-medium border-x border-gray-300">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>

                            {/* Refresh/Update Icon */}
                            <button className="p-1">
                              <svg
                                className="w-5 h-5 "
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <hr className="my-4 border-gray-300" />
            {/* Order Summary */}
            {cartItems.length > 0 && (
              <div className="lg:col-span-1">
                <div className=" p-6 sticky top-24">
                  <h2 className="text-lg font-medium mb-6">ORDER SUMMARY</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>${shipping}</span>
                    </div>
                    <hr className="my-4 border-gray-300" />
                    <div className="flex justify-between text-lg font-medium">
                      <span>TOTAL (TAX INCL.)</span>
                      <span>${total}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="flex items-start gap-2 text-xs text-gray-600">
                      <input type="checkbox" className="mt-1" />I agree to the
                      Terms and Conditions
                    </label>
                  </div>

                  <Button
                    text="CONTINUE"
                    className="w-full h-[50px] justify-center bg-black text-white py-3 text-center text-xl font-medium tracking-wider transition-colors"
                    onClick={() => console.log("Proceed to checkout")}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "favourites" && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No favourites yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
