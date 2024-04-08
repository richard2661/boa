import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-[rgba(217,0,59,1)]">
      <div className="mx-auto py-3 flex justify-center w-full px-[15px] max-w-[1280px] max-lg:max-w-[768px] max-md:max-w-[578px] max-sm:max-w-[420px]">
        <Link to="/">
          <img
            src="/images/Logo.svg"
            className="w-[200px] h-[30px] -mt-1"
            alt="Bank of America"
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
