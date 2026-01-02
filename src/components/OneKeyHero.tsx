import keyIcon from "../assets/key-icon/key.png";
import cartIcon from "../assets/shopping-icon/shopping-cart.png";
import tshirtIcon from "../assets/shopping-icon/t-shirt-icon.jpg";
import docIcon from "../assets/shopping-icon/document-services.webp";

const numbers = Array.from({ length: 16 });
const colors = [
  "#EF4444", // red
  "#3B82F6", // blue
  "#22C55E", // green
  "#F97316", // orange
  "#A855F7", // purple
  "#EAB308", // yellow
  "#EC4899", // pink
  "#92400E", // brown
  "#14B8A6", // teal
  "#06B6D4", // cyan
  "#8B5CF6", // violet
  "#84CC16", // lime
  "#D946EF", // magenta
  "#FB7185", // coral
  "#FACC15", // gold
  "#CBD5E1", // silver
];

export default function OneKeyHero() {
  return (
    <section className="relative flex items-center justify-center h-[500px] overflow-hidden group">
      {/* Circle */}
      <div className="relative left-44 w-[400px] h-[400px] rounded-full bg-white flex items-center justify-center
                      transition-transform duration-500 group-hover:scale-50 group-hover:-translate-x-1/2">

        {/* Key Icon */}
        <img
          src={keyIcon}
          alt="Key Icon"
          className="w-[80%] z-20 transition-all duration-500
                     group-hover:-rotate-90"
        />

        {/* Outer Numbers */}
        <div className="absolute inset-0 flex items-center justify-center animate-rotate-ccw z-10">
        {numbers.map((_, i) => (
            <span
            key={`outer-${i}`}
            className="absolute text-sm font-bold"
            style={{ 
                transform: `rotate(${i * 22.5}deg) translateY(-200px)`,
                color: colors[i % colors.length],
             }}
            >
            1
            </span>
        ))}
        </div>


        {/* Inner Numbers */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
        {/* rotation only */}
        <div className="absolute inset-0 flex items-center justify-center animate-rotate-cw">
            {/* scale only */}
            <div className="scale-150">
            {numbers.map((_, i) => (
                <span
                key={`inner-${i}`}
                className="absolute text-sm font-bold"
                style={{ 
                    transform: `rotate(${i * 22.5}deg) translateY(-160px)`,
                    color: colors[(i + 4) % colors.length],}}
                >
                1
                </span>
            ))}
            </div>
        </div>
        </div>

      </div>


      {/* Description */}
      <div className="ml-20 opacity-0 translate-x-[-20px]
                      transition-all duration-500
                      group-hover:opacity-100 group-hover:translate-x-5">
        <h1 className="text-4xl font-semibold text-black">
          Feel the best experience <br />
          with our services
          <span className="block text-xl font-normal mt-2">
            from a key to all solution
          </span>
        </h1>

        {/* Icons */}
        <div className="flex justify-center gap-4 my-8">
          {[cartIcon, tshirtIcon, docIcon].map((icon, i) => (
            <img
              key={i}
              src={icon}
              className="w-8 h-8 animate-pulse"
              alt="icon"
            />
          ))}
        </div>

        <h2 className="relative overflow-hidden text-sm font-semibold text-blue-500 tracking-wide">
        One Key is for shopping, printing, services
        <span className="absolute top-0 left-0 w-full h-full animate-glass 
                        bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg]" />
        </h2>
      </div>
    </section>
  );
}
