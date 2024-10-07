import { BiSearch } from "react-icons/bi";
import IconButton from "./widgets/IconButton";

const Header = () => {
  return (
    <header className="flex min-h-8 flex-col items-center justify-center bg-slate-700 py-2 font-bold text-white shadow-md sm:flex-row">
      <h1 className="mb-2 border-[1px] border-solid border-white px-2 sm:mb-0 sm:mr-2">
        YATMAN
      </h1>
      <div className="flex items-center gap-2">
        <input
          type="search"
          className="border-[1px] border-white bg-slate-500 px-1 text-black focus:bg-white focus:outline-none"
        ></input>
        <IconButton
          icon={<BiSearch size={22} />}
          className="p-1 font-bold hover:bg-slate-400 hover:text-slate-700"
        ></IconButton>
      </div>
    </header>
  );
};

export default Header;
