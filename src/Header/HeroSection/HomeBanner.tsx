import heroImage from "../Images/banner-image.png";

const HomeBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8">
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 md:mb-0 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="">Starlink kit</span> offers!
          </h1>
          <p className="text-lg md:text-xl text-white mb-2 opacity-80">
            Enjoy super fast internet connection today
          </p>
          <p className="text-2xl md:text-5xl text-white font-bold">
            <span className="text-yellow-400"> GET 20% OFF</span>
          </p>
        </div>
        <div className="md:w-1/3 relative">
          <img src={heroImage} alt="Hero banner" className="object-contain" />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
