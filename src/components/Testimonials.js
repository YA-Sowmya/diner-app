import React from 'react';
import testimonialData from '../data/testimonials';
import TestimonialCard from '../components/ui/TestimonialCard';

function Testimonials() {
  return (
    <section className="bg-highlight py-10 px-4 font-markazi text-center">
      <h2 className="text-3xl text-primary mb-8">What Our Customers Say</h2>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6 place-items-center max-w-7xl mx-auto">
        {testimonialData.map((item, index) => (
          <TestimonialCard
          key={index}
          name={item.name}
          quote={item.quote}
          rating={item.rating}
/>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
