import Link from "next/link";

const Header = () => {
  return (
    <nav className="fixed w-full flex items-center justify-between h-14 text-white z-20 bg-[#111827]">
      <div className="flex items-center justify-start md:justify-center pl-4 w-54 lg:w-64 h-full">
        <h2 className="">
          <Link
            href="/"
            className="font-bold text-base sm:text-lg md:text-2xl lg:text-2xl hover:text-white logo"
          >
            Crypto Ranking
          </Link>
        </h2>
      </div>
      <div className="flex justify-end items-center w-[calc(100% - 3.5rem)] lg:w-[calc(100% - 16rem)]"></div>
    </nav>
  );
};

export default Header;
