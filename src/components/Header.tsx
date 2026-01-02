import keyIcon from "../assets/key-icon/key-for-navbar.png";

const Header = () => {
  return (
    <header className="bg-white py-5">
      <nav className="flex justify-center items-center">
        <div className="bg-gray-200 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[5px] rounded-bl-[30px] md:p-5 p-3.75 flex md:flex-row flex-col items-center justify-between max-w-[800px] w-[90%] shadow-lg relative">
          {/* Key circle for logo */}
          <div className="w-20 h-20 bg-gray-600 rounded-full absolute -left-10 top-1/2 -translate-y-1/2 border-4 border-white"></div>
          <ul className="list-none flex gap-5 m-0 p-0 flex-grow justify-center md:flex-row flex-col md:gap-5 gap-2.5">
            <li className="text-base font-semibold">
              <a className="group flex flex-col items-center no-underline text-gray-800 text-sm relative" href="/">
                <div
                  className="w-[60px] h-[62px] bg-contain bg-no-repeat bg-center -rotate-45 -mb-7 z-10 sepia saturate-[500%] hue-rotate-[-50deg] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                  style={{ backgroundImage: `url(${keyIcon})` }}
                ></div>
                <span className="link-text text-lg font-bold relative z-20 ml-2.5 -mt-5 opacity-100 transition-opacity duration-300">Home</span>
              </a>
            </li>
            <li className="text-base font-semibold">
              <a className="group flex flex-col items-center no-underline text-gray-800 text-sm relative" href="/services">
                <div
                  className="w-[60px] h-[62px] bg-contain bg-no-repeat bg-center -rotate-45 -mb-7 z-10 sepia saturate-[500%] hue-rotate-[-50deg] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                  style={{ backgroundImage: `url(${keyIcon})` }}
                ></div>
                <span className="link-text text-lg font-bold relative z-20 ml-2.5 -mt-5 opacity-100 transition-opacity duration-300">Services</span>
              </a>
            </li>
            <li className="text-base font-semibold">
              <a className="group flex flex-col items-center no-underline text-gray-800 text-sm relative" href="/projects">
                <div
                  className="w-[60px] h-[62px] bg-contain bg-no-repeat bg-center -rotate-45 -mb-7 z-10 sepia saturate-[500%] hue-rotate-[-50deg] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                  style={{ backgroundImage: `url(${keyIcon})` }}
                ></div>
                <span className="link-text text-lg font-bold relative z-20 ml-2.5 -mt-5 opacity-100 transition-opacity duration-300">Products</span>
              </a>
            </li>
            <li className="text-base font-semibold">
              <a className="group flex flex-col items-center no-underline text-gray-800 text-sm relative" href="/contact">
                <div
                  className="w-[60px] h-[62px] bg-contain bg-no-repeat bg-center -rotate-45 -mb-7 z-10 sepia saturate-[500%] hue-rotate-[-50deg] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                  style={{ backgroundImage: `url(${keyIcon})` }}
                ></div>
                <span className="link-text text-lg font-bold relative z-20 ml-2.5 -mt-5 opacity-100 transition-opacity duration-300">Contact</span>
              </a>
            </li>
            <li className="text-base font-semibold">
              <a className="group flex flex-col items-center no-underline text-gray-800 text-sm relative" href="/about">
                <div
                  className="w-[60px] h-[62px] bg-contain bg-no-repeat bg-center -rotate-45 -mb-7 z-10 sepia saturate-[500%] hue-rotate-[-50deg] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                  style={{ backgroundImage: `url(${keyIcon})` }}
                ></div>
                <span className="link-text text-lg font-bold relative z-20 ml-2.5 -mt-5 opacity-100 transition-opacity duration-300">About</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
