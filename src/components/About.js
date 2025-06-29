import React from 'react';
import chef1 from '../assets/images/restaurant chef B.jpg';

function About() {
  return (
    <section className="relative font-markazi text-highlight">
      <img
        src={chef1}
        alt="Chef background"
        className="absolute inset-0 w-full h-full object-cover opacity-25 z-0"
      />
      <div className="absolute inset-0 bg-charcoal opacity-80 z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="text-3xl md:text-3xl text-accent font-bold">About Us</h2>
        <p className="text-base md:text-lg font-karla text-highlight text-opacity-90 leading-relaxed">
          At Little Lemon, our story begins with a deep-rooted passion for Mediterranean cuisine and a love for bringing people together around great food. We’re a family-owned restaurant located in the heart of Chicago, committed to offering a warm, welcoming space for all our guests.
        </p>

        <p className="text-base md:text-lg font-karla text-highlight text-opacity-90 leading-relaxed">
          Our chefs carefully craft each dish using seasonal, locally sourced ingredients to ensure quality and authenticity. Every plate is inspired by traditional flavors, reimagined with a modern twist. Whether it’s a casual lunch or a special dinner, we aim to create a dining experience that feels both comforting and exciting.
        </p>

        <p className="text-base md:text-lg font-karla text-highlight text-opacity-90 leading-relaxed">
          More than just a place to eat, Little Lemon is a celebration of community, family, and culture. We invite you to share our table, explore bold new flavors, and make memories with every meal.
        </p>
      </div>
    </section>
  );
}

export default About;
