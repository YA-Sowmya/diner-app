import React from 'react';
import Button from './ui/Button';

function ReservationList({ reservations = [], onReserve, onBack, onDelete }) {
  return (
    <section className="min-h-[70vh] px-4 py-8 bg-white text-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
          onClick={onBack}
          className="absolute left-4 text-2xl text-primary hover:text-accent"
        >
          ←
        </button>
          <h2 className="text-3xl font-markazi text-primary text-center flex-1 -ml-8">
            Your Reservations
          </h2>
        </div>

        {reservations.length === 0 ? (
          <div className="text-center mt-10 ">
            <p className="text-lg text-gray-600 mb-4">
              You don’t have any reservations yet.
            </p>
            <Button className="text-lg px-4 mt-4 md:text-xl lg:text-2xl font-markazi" onClick={onReserve}>Reserve a Table</Button>
          </div>
        ) : (
          <div className="grid gap-5 font-karla">
            {reservations.map((res) => (
              <div
                key={res.id}
                className="bg-highlight border border-accent rounded-lg shadow p-5"
              >
                <div className="grid md:grid-cols-2 gap-2 text-base">
                  <p><strong>Name:</strong> {res.name}</p>
                  <p><strong>Email:</strong> {res.email}</p>
                  <p><strong>Date:</strong> {res.date}</p>
                  <p><strong>Time:</strong> {res.time}</p>
                  <p><strong>Guests:</strong> {res.guests}</p>
                  <p><strong>Seating:</strong> {res.seating}</p>
                </div>
                <div className="mt-4 text-right  font-markazi">
                  <Button className='text-lg px-4 mt-4 md:text-xl lg:text-xl font-markazi'
                    onClick={() => onDelete(res.id)}
                  >
                    Cancel Reservation
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ReservationList;
