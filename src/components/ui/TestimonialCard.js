import React from 'react';

function TestimonialCard({ name, quote, rating }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 max-w-xs w-full text-center flex flex-col items-center font-karla min-h-[170px] text-charcoal">
      <div className="text-accent text-xl mb-2">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>
            {i < rating ? '★' : '☆'}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-600 italic mb-2">"{quote}"</p>
      <h4 className="text-base font-semibold text-primary">{name}</h4>
    </div>
  );
}

export default TestimonialCard;
