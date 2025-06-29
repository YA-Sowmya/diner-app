import {useState} from 'react';
import bannerImg from '../assets/images/restaurantfood.jpg';
import Button from '../components/ui/Button';

function Banner({ onReserve }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <section className="bg-charcoal py-6 px-4 font-markazi">
      <div className="flex items-center justify-between w-full mx-auto gap-1">

        <div className="w-2/3 lg:w-[70%] flex flex-col min-h-[240px] space-y-4">
          <div className="p-2"> 
            <h1 className="text-3xl md:text-4xl lg:text-4xl text-accent font-bold">Little Lemon</h1>
            <h2 className="text-lg md:text-2xl lg:text-3xl text-primary">Chicago</h2>
            <p className="text-sm md:text-base lg:text-lg text-highlight text-opacity-70 font-karla leading-relaxed">
              Little Lemon is a family-owned Mediterranean restaurant in Chicago, offering fresh, seasonal dishes with a modern twist. 
            </p>
            <p className="text-sm md:text-base lg:text-lg text-highlight text-opacity-70 font-karla leading-relaxed">
              We bring you bold flavors in a warm, welcoming space.
            </p>
          </div>
          <Button onClick={onReserve} className="self-start text-lg px-4 md:text-xl lg:text-2xl">Reserve a Table</Button>
        </div>

        {/* Image Section */}
         <div className="w-1/3 lg:w-[30%] flex justify-center items-center relative group">
      {/* Blur placeholder */}
      <div className={`absolute rounded-xl w-full max-w-[120px] md:max-w-[160px] lg:max-w-[220px] h-[150px] sm:h-[200px] md:h-[200px] lg:h-[300px] bg-gray-200 blur-md  duration-300 ${imgLoaded ? 'opacity-0' : 'opacity-20'}`} />

      {/* Actual image */}
      <img
        src={bannerImg}
        alt="Restaurant food"
        onLoad={() => setImgLoaded(true)}
        className={`rounded-xl w-full max-w-[120px] md:max-w-[160px] lg:max-w-[220px] h-[150px] sm:h-[200px] md:h-[200px] lg:h-[300px] shadow-md object-cover  duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
      </div>
    </section>
  );
}

export default Banner;
