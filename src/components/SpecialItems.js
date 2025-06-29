import React from 'react';
import DishCard from '../components/ui/DishCard';
import dishes from '../data/dishes';
import Button from './ui/Button';

function SpecialItems({ onViewMenu, cart, onAdd, onDecrement }) {
  const specialDishes = dishes.filter(dish => dish.isSpecial);

  return (
    <section className="mb-2 py-5 px-4 bg-highlight">
      <div className="font-markazi text-3xl text-primary mb-6 flex justify-center">
        <h2>Special Items</h2>
      </div>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-5 place-items-center mb-3 w-full max-w-6xl mx-auto">
        {specialDishes.map(dish => (
          <DishCard
  key={dish.id}
  id={dish.id}
  name={dish.name}
  description={dish.description}
  price={dish.price}
  image={dish.image}
  quantity={cart.find(i => i.id === dish.id)?.quantity || 0}
  onAdd={() => onAdd(dish)}
  onIncrement={() => onAdd(dish)}
  onDecrement={() => onDecrement(dish.id)}
/>
        ))}
      </div>

      <div className="font-markazi  flex justify-center  ">
        <Button className="text-lg px-4 md:text-xl lg:text-2xl" onClick={onViewMenu}>View Menu</Button>
      </div>
    </section>
  );
}

export default SpecialItems;
