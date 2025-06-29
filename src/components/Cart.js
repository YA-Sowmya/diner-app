// components/Cart.js
import React, { useEffect } from 'react';
import Button from './ui/Button';

function Cart({ items, onBack, onIncrease, onDecrease, onRemove, onCheckout }) {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const total = items.reduce((sum, item) => {
    const numericPrice = parseFloat(item.price.replace('$', ''));
    return sum + numericPrice * item.quantity;
  }, 0);

  return (
    <section className="min-h-screen p-6 font-karla bg-white text-charcoal">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-xl text-primary hover:text-accent"
        >
          ←
        </button>
        <h2 className="font-markazi text-3xl text-primary mb-1 flex justify-center">Your Cart</h2>
        <div></div>
      </div>
<div className="flex flex-col items-center">


      {items.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6 w-full max-w-4xl ">
            {items.map((item) => (
              <li
                key={item.id}
                className="border border-gray-300 rounded-lg p-3 shadow-sm flex justify-between items-center"
              >
                <div className="flex flex-col text-sm">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-gray-600 text-xs">
                    {item.price} x {item.quantity} = $
                    {(
                      parseFloat(item.price.replace('$', '')) * item.quantity
                    ).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDecrease(item.id)}
                    className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onIncrease(item.id)}
                    className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="ml-2 text-red-500 text-xs hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Total & Checkout */}
          <div className="text-right font-semibold text-lg mb-4">
            Total: ${total.toFixed(2)}
          </div>

          <div className="flex justify-end">
            <Button className="text-lg px-4 md:text-xl lg:text-2xl font-markazi" onClick={onCheckout}>Checkout</Button>

          </div>
        </>
      )}
      </div>
    </section>
  );
}

export default Cart;
