import {useState} from 'react';
import Button from './Button';

function DishCard({ id, name, description, price, image, quantity = 0, onAdd, onIncrement, onDecrement }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
<div className="bg-white shadow-md rounded-lg overflow-hidden w-full h-[400px] flex flex-col justify-between p-4 font-karla">
  <div className="image-container w-full h-[210px] relative">
    <div className={`image-blur-loader ${imgLoaded ? 'loaded' : ''}`} />
    <img
      src={image}
      alt={name}
      onLoad={() => setImgLoaded(true)}
      className={`actual-image ${imgLoaded ? 'loaded' : ''}`}
    />
  </div>

  <div className="p-4 flex flex-col justify-between flex-grow">
    <div>
      <div className="flex justify-between items-center mb-2 gap-2">
        <h3 className="text-base font-bold">{name}</h3>
        <span className="text-sm font-semibold text-accent">{price}</span>
      </div>
      <p className="text-xs text-gray-600 line-clamp-3">{description}</p>
    </div>

    <div className="mt-4 flex justify-center items-center gap-2">
      {quantity === 0 ? (
        <Button onClick={onAdd} className="px-3 py-1 text-sm">Add</Button>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <Button onClick={onDecrement} className="w-8 h-8 flex items-center justify-center bg-accent text-primary rounded text-lg leading-[1]">−</Button>
          <div className="w-6 h-8 flex items-center justify-center text-base leading-[1]">{quantity}</div>
          <Button onClick={onIncrement} className="w-8 h-8 flex items-center justify-center bg-accent text-primary rounded text-lg leading-[1]">+</Button>
        </div>
      )}
    </div>
  </div>
</div>

  );
}

export default DishCard;
