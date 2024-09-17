import { IoClose } from "react-icons/io5";

const Modal = ({ title, children, closeHandler }) => {
  return (
    <div
      className="fixed left-0 top-0 h-full w-full overflow-hidden bg-black bg-opacity-20"
      onClick={closeHandler}
    >
      <div
        className="mx-auto mt-36 flex max-w-xl flex-col border-2 border-solid border-slate-700 bg-slate-600 p-2 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-6">
          <p className="text-center text-lg font-bold">{title}</p>
          <button
            className="absolute right-0 top-0 hover:text-red-500"
            onClick={closeHandler}
          >
            <IoClose size={32} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
