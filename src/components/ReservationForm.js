import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import Button from './ui/Button';
import { useToast } from '../context/ToastContext';

function ReservationForm({ onClose, user }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [seating, setSeating] = useState('indoor');
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from('reservations').insert([
      {
        user_id: user.id,
        email: user.email,
        name,
        date,
        time,
        guests: parseInt(guests),
        seating,
      },
    ]);
    console.log("Logged in user ID:", user?.id);
        if (error) {
          toast(`Error saving reservation: ${error.message}`);
          console.error(error);
        } else {
          toast("Reservation successful!");
          onClose();
        }
      };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl md:text-3xl text-center text-primary font-markazi mb-4">
          Reserve a Table
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-primary font-karla">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-accent focus:border-2 focus:border-accent focus:outline-none px-3 py-2 rounded-md"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full border border-accent focus:border-2 focus:border-accent focus:outline-none px-3 py-2 rounded-md"
            required
          />
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-accent focus:border-2 focus:border-accent appearance-none focus:outline-none px-3  py-2 rounded-md"
            required
          >
            <option value="">Select a time</option>
            <option value="17:00">5:00 PM</option>
            <option value="18:00">6:00 PM</option>
            <option value="19:00">7:00 PM</option>
            <option value="20:00">8:00 PM</option>
            <option value="21:00">9:00 PM</option>
          </select>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full border border-accent focus:border-2 focus:border-accent focus:outline-none px-3 py-2 rounded-md"
            required
          />
          <fieldset className="mt-4 text-primary">
            <legend className="text-m  mb-2">Seating Preference:</legend>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm font-karla">
                <input
                  type="radio"
                  value="indoor"
                  checked={seating === 'indoor'}
                  onChange={() => setSeating('indoor')}
                  className="accent-accent w-4 h-4"
                />
                Indoor
              </label >
              <label className="flex items-center gap-2 text-sm font-karla">
                <input
                  type="radio"
                  value="outdoor"
                  checked={seating === 'outdoor'}
                  onChange={() => setSeating('outdoor')}
                  className="w-4 h-4 1 accent-accent"
                />
                Outdoor
              </label>
            </div>
          </fieldset>

          <div className="font-markazi flex justify-center">
            <Button className="text-lg px-4 mt-4 md:text-xl lg:text-2xl font-markazi" type="submit">Submit Reservation</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReservationForm;
