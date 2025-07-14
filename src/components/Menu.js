import React, { useState } from "react";
import menuItems from "../data/dishes";
import DishCard from "./ui/DishCard";
import Button from "./ui/Button";

function Menu({ onBack, onAdd, onDecrement, cart }) {
  const [filter, setFilter] = useState("all");

  const filteredItems =
    filter === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === filter);

  return (
    <section className="w-full px-2 py-6 text-charcoal min-h-screen flex flex-col">
      <div className="flex items-center justify-center px-4 mb-6 relative">
        <button
          onClick={onBack}
          className="absolute left-4 text-2xl text-primary hover:text-accent"
        >
          ←
        </button>
        <h2 className="font-markazi text-3xl text-primary mb-1 flex justify-center">
          Our Menu
        </h2>
      </div>

      <div className="flex justify-center gap-2 mb-6 flex-wrap font-markazi">
        {["all", "starters & sides", "mains", "desserts & drinks"].map(
          (cat) => (
            <Button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2 py-1  md:text-xl lg:text-xl rounded-full text-sm transition ${
                filter === cat
                  ? "bg-accent text-primary"
                  : "bg-highlight text-charcoal"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Button>
          )
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto px-4 auto-rows-fr w-full max-w-6xl">
        {filteredItems.map((dish) => (
          <DishCard
            key={dish.id}
            id={dish.id}
            name={dish.name}
            description={dish.description}
            price={dish.price}
            image={dish.image}
            quantity={cart.find((i) => i.id === dish.id)?.quantity || 0}
            onAdd={() => onAdd(dish)}
            onIncrement={() => onAdd(dish)}
            onDecrement={() => onDecrement(dish.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default Menu;
