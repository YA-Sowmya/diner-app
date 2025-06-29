// components/CheckoutForm.js
import React, { useState } from 'react';
import Button from './ui/Button';
import { supabase } from '../supabaseClient';
import { useToast } from '../context/ToastContext';

function CheckoutForm({ user, cartItems, onBack, onSuccess, clearCart }) {
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const toast = useToast(); // ⬅️ Access toast function

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.address || !form.phone) {
      toast('Please fill all fields.', 'error');
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('orders').insert({
      user_id: user?.id || null,
      name: form.name,
      address: form.address,
      phone: form.phone,
      cart: cartItems,
    });

    setLoading(false);

    if (error) {
      toast(error.message, 'error');
    } else {
      toast('Order placed successfully!');
      clearCart();
      onSuccess();
    }
  };

  return (
    <section className="min-h-screen p-6 font-karla bg-white text-charcoal">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-xl text-primary hover:text-accent">←</button>
        <h2 className="font-markazi text-3xl text-primary mb-1 flex justify-center">Checkout</h2>
        <div />
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-accent focus:border-2 focus:border-accent focus:outline-none px-3 py-2 rounded-md"
        />
        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border border-accent focus:border-2 focus:border-accent focus:outline-none px-3 py-2 rounded-md"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border border-accent focus:border-2 focus:border-accent focus:outline-none px-3 py-2 rounded-md"
        />
        <div className='flex justify-center'>
          <Button type="submit" disabled={loading} className="text-lg px-4 mt-4 md:text-xl lg:text-2xl font-markazi">
                  {loading ? 'Placing Order...' : 'Confirm Order'}
                </Button>
        </div>
        
      </form>
    </section>
  );
}

export default CheckoutForm;
